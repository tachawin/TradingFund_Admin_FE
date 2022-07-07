import { getAccessToken } from 'common/utils/auth'
import { WithdrawTableState } from 'pages/presentation/withdraw/Withdraw'
import axios, { authorizationHandler } from './axios'
import { TransactionInterface } from './transaction'

export enum WithdrawType {
    Auto = 'auto',
    Manual = 'manual'
}

export interface WithdrawUpdateInterface {
    notes?: string
}

export interface WithdrawUpdateCustomerInterface {
    mobileNumber: string
    notes?: string
}

export interface WithdrawCreateInterface {
    mobileNumber: string
    companyBankId: string
    amount: number
    payslipPictureURL?: string
}

export interface SlipImageInterface {
    payslipPictureURL: string
}

export interface ErrorResponse {
    code: number
    message: string
}

export const uploadSlipImage = async (
    data: FormData,
    next: (imageURL: SlipImageInterface) => void,
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
                url: '/transaction/withdraw/upload/payslip',
                data
            })
            next(res.data)
		} catch (error: any) {
			handleError(error)
            throw error
		}
    })

export const withdraw = async (
    data: WithdrawCreateInterface,
    type: WithdrawType,
    next: (response: TransactionInterface | ErrorResponse) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
            const res = await axios({
                method: 'post',
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                url: `/transaction/withdraw/action/${type}`,
                data
            })
            next(res.data)
        } catch (error: any) {
            handleError(error)
            throw error
        }
    })

export const getWithdrawList = async (
    query: string,
    type: WithdrawTableState | string,
    next: (withdrawList: TransactionInterface[]) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
			const res = await axios({
                method: 'get',
                url: `/transaction/withdraw/admin/list/${type}${query}`,
                headers: { Authorization: `Bearer ${getAccessToken()}` },
            })
            next(res.data)
        } catch (error: any) {
            handleError(error)
            throw error
        }
})

export const rejectWithdraw = async (
    transactionId: string,
    next: (response: TransactionInterface | ErrorResponse) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
            const res = await axios({
                method: 'post',
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                url: '/transaction/withdraw/request/cancel',
                data: { transactionId }
            })
            next(res.data)
        } catch (error: any) {
            handleError(error)
            throw error
        }
    })