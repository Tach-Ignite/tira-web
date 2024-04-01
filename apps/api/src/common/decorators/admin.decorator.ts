import { SetMetadata } from '@nestjs/common';

export const RoleAccess = (roles: string[]) => SetMetadata('roles', roles);
