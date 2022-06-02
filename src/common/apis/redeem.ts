import { getAccessToken } from 'common/utils/auth'
import { CreditTableState } from 'pages/presentation/credit/Credit'
import { RewardTableState } from 'pages/presentation/reward/Reward'
import axios, { authorizationHandler } from './axios'

export enum RedeemType {
    Credit = 'credit',
    Product = 'product'
}

export const TYPE = [RedeemType.Credit, RedeemType.Product]

export enum RedeemStatus {
    Request = 'request',
    Sending = 'sending',
    Success = 'success',
    Reject = 'reject'
}

export const STATUS = [RedeemStatus.Request, RedeemStatus.Sending, RedeemStatus.Success, RedeemStatus.Reject]

export enum RedeemAction {
    Accept = 'accept',
    Sending = 'sending',
    Reject = 'reject'
}

export interface RedeemBaseInterface {
    mobileNumber: string
    customerId: string
    productId?: string
    credit?: number
    point: number
    address?: string
    notes?: string
    status: RedeemStatus
    redeemType: RedeemType
    productName: string
    adminName?: string
}

export interface RedeemUpdateBodyInterface {
    notes?: string
}

export interface RedeemInterface extends RedeemBaseInterface {
    redeemId?: string
    createdAt?: Date
    updatedAt?: Date
    adminId?: string
}

export const getRedeemProductList = async (
    query: string,
    state: RewardTableState | string,
    next: (redeemList: RedeemInterface[]) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `/redeem_product/list/${state}${query}`,
                headers: { Authorization: `Bearer ${getAccessToken()}` },
            })
            next(res.data)
        } catch (error: any) {
            handleError(error)
        }
})

export const getRedeemCreditList = async (
    query: string,
    state: CreditTableState | string,
    next: (redeemList: RedeemInterface[]) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `/redeem_credit/list/${state}${query}`,
                headers: { Authorization: `Bearer ${getAccessToken()}` },
            })
            next(res.data)
        } catch (error: any) {
            handleError(error)
        }
})
 
export const updateRedeem = async (
    redeemId: string,
    action: RedeemAction,
    data: RedeemUpdateBodyInterface,
    next: () => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
			await axios({
                method: 'patch',
                url: `/redeem_product/${action}/${redeemId}`,
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                data
            })
            next()
		} catch (error: any) {
			handleError(error)
		}
    })

export const updateRedeemCredit = async (
    redeemId: string,
    action: RedeemAction,
    data: RedeemUpdateBodyInterface,
    next: () => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
            await axios({
                method: 'patch',
                url: `/redeem_credit/${action}/${redeemId}`,
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                data
            })
            next()
        } catch (error: any) {
            handleError(error)
        }
    })
    