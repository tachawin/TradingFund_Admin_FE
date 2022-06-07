import { getAccessToken } from 'common/utils/auth'
import { Status } from 'pages/common/CommonEnums'
import axios, { authorizationHandler } from './axios'

interface PermissionInterface {
    [key: string]: string
}

export enum AdminRole {
    Admin = 'admin',
    SuperAdmin = 'super_admin'
}
export const ROLES = [AdminRole.Admin, AdminRole.SuperAdmin]

export enum AdminStatus {
    Active = 'active',
    Inactive = 'inactive'
}
export const STATUS = [AdminStatus.Active, AdminStatus.Inactive]

interface AdminBaseInterface {
    username: string
    name: string
    mobileNumber: string
    role: AdminRole
    status: AdminStatus
    features?: PermissionInterface
}

export interface AdminInterface extends AdminBaseInterface {
    adminId?: string
    createdAt?: Date
    updatedAt?: Date
    password?: string
}

export interface AdminUpdateInterface {
    status?: AdminStatus
    role?: AdminRole
    name?: string
    mobileNumber?: string
    password?: string
}

export const createAdmin = async (
    data: AdminInterface,
    next: (admin: AdminInterface) => void,
    handleError: (error: any) => void
) => 
    await authorizationHandler(async () => {
        try {
            const res = await axios({
                method: 'post',
                url: '/admin/register',
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                data
            })
            next(res.data)
        } catch (error: any) {
            handleError(error)
        }
    }
)


export const updateAdmin = async (
    adminId: string, 
    data: AdminUpdateInterface,
    next: (admin: AdminInterface) => void,
    handleError: (error: any) => void
) => 
    await authorizationHandler(async () => {
        try {
            const res = await axios({
                method: 'patch',
                url: `/admin/update/${adminId}`,
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                data
            })
            next(res.data)
        } catch (error: any) {
            handleError(error)
        }
    }
)

export const updatePermission = async (
    adminId: string, 
    data: PermissionInterface,
    next: (admin: AdminInterface) => void,
    handleError: (error: any) => void
) => 
    await authorizationHandler(async () => {
        try {
            const res = await axios({
                method: 'patch',
                url: `/admin/permission/${adminId}`,
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                data
            })
            next(res.data)
        } catch (error: any) {
            handleError(error)
        }
    }
)

export const getAdminList = async (
    query: string,
    next: (adminList: AdminInterface[]) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
			const res = await axios({
                method: 'get',
                url: `/admin/list${query}`,
                headers: { Authorization: `Bearer ${getAccessToken()}` },
            })
            next(res.data)
        } catch (error: any) {
            handleError(error)
        }
})

export const deleteAdmin = async (
    adminId: string,
    next: () => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
			await axios({
                method: 'delete',
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                url: '/admin/delete/soft',
                data: { adminId }
            })
            next()
		} catch (error: any) {
			handleError(error)
		}
    })
