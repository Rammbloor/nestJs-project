export enum ROLE {
    USER = "user",
    ADMIN = "admin",
}

export type TRole = typeof ROLE;
export type TRolesKey = (typeof ROLE)[keyof typeof ROLE];