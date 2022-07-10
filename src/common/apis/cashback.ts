import { getAccessToken } from 'common/utils/auth'
import axios, { authorizationHandler } from './axios'

export enum CashbackStatus {
    Success = 'success',
    Cancel = 'cancel',
    Check = 'check'
}

export interface CashbackInterface {
    cashbackId?: string
    username: string
    type: string
    investAmount: number
    cashback: number
    hash: string
    code?: number
    msg?: string
    status?: CashbackStatus
    dateStart: string
    dateEnd: string
    createdAt?: Date
    updatedAt?: Date
}

export const getCurrentCashback = async (
    mobileNumber: string,
    next: (amount: number) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
			const res = await axios({
                method: 'get',
                url: `/cashback/customer/${mobileNumber}/current`,
                headers: { Authorization: `Bearer ${getAccessToken()}` },
            })
            next(res.data.amount)
        } catch (error: any) {
            handleError(error)
            throw error
        }
})

export const getCashbackHistory = async (
    mobileNumber: string,
    next: (cashbackList: CashbackInterface[]) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
			const res = await axios({
                method: 'get',
                url: `/cashback/customer/${mobileNumber}/history`,
                headers: { Authorization: `Bearer ${getAccessToken()}` },
            })
            next(res.data)
        } catch (error: any) {
            handleError(error)
            throw error
        }
})