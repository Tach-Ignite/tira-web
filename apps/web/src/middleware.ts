import { NextRequest, NextResponse } from 'next/server';
import {
  AUTHENTICATION_COOKIE,
  CURRENT_ORG_COOKIE,
  CURRENT_TEAM_COOKIE,
  CURRENT_USER_COOKIE,
  CURRENT_USER_ROLE_COOKIE,
} from '@services/auth-cookie';
import authenticated from './services/authenticated';
import {
  authenticatedRoutes,
  routes,
  unauthenticatedRoutes,
  unauthenticatedAuthRoutes,
} from './app/common/constants/routes';
import { UserRoles } from './types/modules';

export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  if (
    authenticatedRoutes.some((route) =>
      route.exactMatch
        ? pathName === route.path
        : pathName.startsWith(route.path),
    )
  ) {
    const isAuthenticated = await authenticated();

    if (!isAuthenticated) {
      request.cookies.delete([
        CURRENT_USER_COOKIE,
        AUTHENTICATION_COOKIE,
        CURRENT_ORG_COOKIE,
        CURRENT_TEAM_COOKIE,
        CURRENT_USER_ROLE_COOKIE,
      ]);
      return NextResponse.redirect(
        new URL(`/app/auth/login?redirectPath=${pathName}`, request.url),
      );
    }

    // const currentUser = request.cookies.get(CURRENT_USER_COOKIE);
    const currentUserRole = request.cookies.get(CURRENT_USER_ROLE_COOKIE);

    if (currentUserRole) {
      const { name: role } = JSON.parse(currentUserRole.value) || 'guest';

      if (
        // AdminRoutes.some((route) =>
        routes.some((route) =>
          route.exactMatch
            ? pathName === route.path
            : pathName.startsWith(route.path),
        ) &&
        role !== UserRoles.SuperAdmin &&
        role !== UserRoles.SystemAdmin
      ) {
        request.cookies.delete([
          CURRENT_USER_COOKIE,
          CURRENT_ORG_COOKIE,
          CURRENT_TEAM_COOKIE,
          AUTHENTICATION_COOKIE,
          CURRENT_USER_ROLE_COOKIE,
        ]);
        return NextResponse.redirect(
          new URL('/app/auth/notfound', request.url),
        );
      }

      if (
        unauthenticatedRoutes.some((route) =>
          route.exactMatch
            ? pathName === route.path
            : pathName.startsWith(route.path),
        ) &&
        role !== UserRoles.User
      ) {
        request.cookies.delete([
          CURRENT_USER_COOKIE,
          AUTHENTICATION_COOKIE,
          CURRENT_ORG_COOKIE,
          CURRENT_TEAM_COOKIE,
          CURRENT_USER_ROLE_COOKIE,
        ]);
        return NextResponse.redirect(
          new URL('/app/auth/notfound', request.url),
        );
      }
      // request.cookies.delete([
      //   CURRENT_USER_COOKIE,
      //   AUTHENTICATION_COOKIE,
      //   CURRENT_USER_ROLE_COOKIE,
      // ]);
      // return NextResponse.redirect(new URL('/app/auth/notfound', request.url));
    }
  } else if (
    unauthenticatedAuthRoutes.some((route) =>
      route.exactMatch
        ? pathName === route.path
        : pathName.startsWith(route.path),
    )
  ) {
    const isAuthenticated = await authenticated();
    if (isAuthenticated) {
      const currentUserRole = request.cookies.get(CURRENT_USER_ROLE_COOKIE);
      if (currentUserRole) {
        const { name: role } = JSON.parse(currentUserRole.value) || 'guest';
        if (role === UserRoles.SuperAdmin || role === UserRoles.SystemAdmin) {
          return NextResponse.redirect(
            new URL('/app/admin-console', request.url),
          );
        }
        if (role === UserRoles.User) {
          return NextResponse.redirect(new URL('/app/console', request.url));
        }
        request.cookies.delete([
          CURRENT_USER_COOKIE,
          AUTHENTICATION_COOKIE,
          CURRENT_ORG_COOKIE,
          CURRENT_TEAM_COOKIE,
          CURRENT_USER_ROLE_COOKIE,
        ]);
        return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|webmanifest.webmanifest|_next/static|_next/image|.*\\.png$|.*\\.svg$).*)',
  ],
};
