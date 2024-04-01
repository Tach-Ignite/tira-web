import { NextRequest, NextResponse } from 'next/server';
import {
  AUTHENTICATION_COOKIE,
  CURRENT_USER_COOKIE,
} from '@services/auth-cookie';
import authenticated from './services/authenticated';
import { authenticatedRoutes, routes } from './app/common/constants/routes';

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
      request.cookies.delete([CURRENT_USER_COOKIE, AUTHENTICATION_COOKIE]);
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const currentUser = request.cookies.get(CURRENT_USER_COOKIE);

    if (currentUser) {
      const { role } = JSON.parse(currentUser.value);

      if (
        // AdminRoutes.some((route) =>
        routes.some((route) =>
          route.exactMatch
            ? pathName === route.path
            : pathName.startsWith(route.path),
        ) &&
        role.name !== 'admin'
      ) {
        request.cookies.delete([CURRENT_USER_COOKIE, AUTHENTICATION_COOKIE]);
        return NextResponse.redirect(new URL('/auth/notfound', request.url));
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
