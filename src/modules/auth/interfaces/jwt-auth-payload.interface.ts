import {TRolesKey} from '../../../common/enums/role.enum';

export interface IJWTAuthPayload {
    id: string;
    role: TRolesKey;
}