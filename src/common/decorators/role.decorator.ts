import { ROLE, TRolesKey } from '../enums/role.enum';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: TRolesKey[]) => SetMetadata(ROLE, roles);
