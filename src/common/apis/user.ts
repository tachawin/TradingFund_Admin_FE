export enum PermissionType {
    Read = 0,
    Create = 1,
    Update = 2,
    Delete = 3 
}

export enum PermissionValue {
    Available = '1',
    Unavailable = '0'
}

export interface UserInterface {
    features: { [key: string]: string }
}