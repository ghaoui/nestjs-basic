import { SetMetadata } from '@nestjs/common';
export const hasRoles = (...roles: string[]) => {
  return SetMetadata('roles', roles);
};
