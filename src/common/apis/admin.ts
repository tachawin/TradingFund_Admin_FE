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

interface AdminBaseInterface {
    username: string
    name: string
    mobileNumber: string
    role: AdminRole
    status: Status
    features?: PermissionInterface
}

export interface AdminInterface extends AdminBaseInterface {
    adminId?: string
    createdAt?: Date
    updatedAt?: Date
    password?: string
}

export const createAdmin = (data: AdminInterface) => 
    axios({
        method: 'post',
        url: '/admin/register',
        data
    })

export const getAdminList = async (
    next: (adminList: AdminInterface[]) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
			const res = await axios({
                method: 'get',
                url: '/admin/list',
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                },
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
                method: 'get',
                url: '/admin/delete/hard',
                data: { adminId }
            })
            next()
		} catch (error: any) {
			handleError(error)
		}
    })
