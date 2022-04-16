import { Status } from 'pages/common/CommonEnums'
import axios from './axios'

interface PermissionInterface {
    [key: string]: string
}

export enum AdminRole {
    Admin = 'admin',
    SuperAdmin = 'super_admin'
}

export interface AdminInterface {
    username: string
    password: string
    name: string
    mobileNumber: string
    role: AdminRole
    status: Status
    features?: PermissionInterface
}

export const createAdmin = (data: AdminInterface) => 
    axios({
        method: 'post',
        url: '/admin/register',
        data
    })
