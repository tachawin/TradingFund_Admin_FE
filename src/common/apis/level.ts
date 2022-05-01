import { getAccessToken } from 'common/utils/auth'
import axios, { authorizationHandler } from './axios'

export enum LevelStatus {
    Active = 'active',
    Inactive = 'inactive'
}

export const STATUS = [LevelStatus.Active, LevelStatus.Inactive]

export interface LevelBaseInterface {
    levelName: string
    minimumCredit: number
    color?: string
    status?: LevelStatus
}

export interface LevelUpdateBodyInterface {
    levelName?: string
    minimumCredit?: number
    color?: string
    status?: LevelStatus
}

export interface LevelInterface extends LevelBaseInterface {
    levelId: string
    createdAt: Date
    updatedAt: Date
}

export const createLevel = (data: LevelInterface) => 
    axios({
        method: 'post',
        url: '/level/create',
        headers: { Authorization: `Bearer ${getAccessToken()}` },
        data
    })

export const getLevelList = async (
    query: string,
    next: (levelList: LevelInterface[]) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `/level/list${query}`,
                headers: { Authorization: `Bearer ${getAccessToken()}` },
            })
            next(res.data)
        } catch (error: any) {
            handleError(error)
        }
})
 
export const updateLevel = async (
    levelId: string,
    data: LevelUpdateBodyInterface,
    next: () => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
			await axios({
                method: 'get',
                url: `/level/update/${levelId}`,
                data
            })
            next()
		} catch (error: any) {
			handleError(error)
		}
    })

export const deleteLevel = async (
    levelId: string,
    next: () => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
			await axios({
                method: 'get',
                url: '/level/delete',
                data: { levelId }
            })
            next()
		} catch (error: any) {
			handleError(error)
		}
    })
