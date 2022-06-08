import { getAccessToken } from 'common/utils/auth'
import axios, { authorizationHandler } from './axios'

export enum LevelStatus {
    Active = 'active',
    Inactive = 'inactive'
}

export const STATUS = [LevelStatus.Active, LevelStatus.Inactive]

export interface LevelBaseInterface {
    levelName: string
    imageURL?: string
    minimumDepositAmount: number
    maximumDepositAmount: number
    investmentAmount: number
    cashback: number
    status?: LevelStatus
}

export interface LevelUpdateBodyInterface {
    levelName?: string
    imageURL?: string
    minimumDepositAmount?: number
    maximumDepositAmount?: number
    investmentAmount?: number
    cashback?: number
    status?: LevelStatus
}

export interface LevelInterface extends LevelBaseInterface {
    levelId: string
    createdAt: Date
    updatedAt: Date
}

export interface LevelImageUrlInterface {
    imageURL: string
}

export const createLevel = async (
    data: LevelBaseInterface,
    next: (level: LevelInterface) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
            const res = await axios({
                method: 'post',
                url: '/level/create',
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                data
            })
            next(res.data)
        } catch (error: any) {
            handleError(error)
        }
    }
)

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
    next: (level: LevelInterface) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
			const res = await axios({
                method: 'patch',
                url: `/level/update/${levelId}`,
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                data
            })
            next(res.data)
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
                method: 'delete',
                url: '/level/delete',
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                data: { levelId }
            })
            next()
		} catch (error: any) {
			handleError(error)
		}
    })

export const uploadLevelImage = async (
    data: FormData,
    next: (imageURL: LevelImageUrlInterface) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
            const res = await axios({
                method: 'post',
                headers: { 
                    Authorization: `Bearer ${getAccessToken()}`,
                    "Content-Type": "multipart/form-data",
                },
                url: '/level/upload/image',
                data
            })
            next(res.data)
        } catch (error: any) {
            handleError(error)
        }
    })