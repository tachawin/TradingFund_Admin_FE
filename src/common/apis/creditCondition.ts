import { getAccessToken } from 'common/utils/auth'
import axios, { authorizationHandler } from './axios'

export interface CreditConditionBaseInterface {
    point: number
    credit: number
    quantity?: number
}

export interface CreditConditionUpdateBodyInterface {
    point?: number
    credit?: number
    quantity?: number
}

export interface CreditConditionInterface extends CreditConditionBaseInterface {
    conditionId: string
    createdAt: Date
    updatedAt: Date
}

export const createCreditCondition = async (
    data: CreditConditionBaseInterface,
    next: (creditCondition: CreditConditionInterface) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
            const res = await axios({
                method: 'post',
                url: '/credit_condition/create',
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                data
            })
            next(res.data)
        } catch (error: any) {
            handleError(error)
        }
    }
)

export const getCreditConditionList = async (
    query: string,
    next: (creditConditionList: CreditConditionInterface[]) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `/credit_condition/list${query}`,
                headers: { Authorization: `Bearer ${getAccessToken()}` },
            })
            next(res.data)
        } catch (error: any) {
            handleError(error)
        }
})
 
export const updateCreditCondition = async (
    conditionId: string,
    data: CreditConditionUpdateBodyInterface,
    next: (creditCondition: CreditConditionInterface) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
			const res = await axios({
                method: 'patch',
                url: `/credit_condition/update/${conditionId}`,
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                data
            })
            next(res.data)
		} catch (error: any) {
			handleError(error)
		}
    })

export const deleteCreditCondition = async (
    conditionId: string,
    next: () => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
			await axios({
                method: 'delete',
                url: '/credit_condition/delete',
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                data: { conditionId }
            })
            next()
		} catch (error: any) {
			handleError(error)
		}
    })
