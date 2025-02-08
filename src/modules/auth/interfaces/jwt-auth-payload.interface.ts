import {TRolesKey} from '../../../common/enums/role.enum';

export interface IJWTAuthPayload {
    id: number;
    role: TRolesKey;
}