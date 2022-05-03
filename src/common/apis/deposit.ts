import { getAccessToken } from 'common/utils/auth'
import axios, { authorizationHandler } from './axios'

export enum TransactionStatus {
    Success = 'success',
    NotFound = 'not_found',
    Cancel = 'cancel',
}
export const STATUS = [TransactionStatus.Success, TransactionStatus.NotFound, TransactionStatus.Cancel]

export enum TransactionType {
    Withdraw = 'withdraw',
    RequestWithdraw = 'request_withdraw',
    Deposit = 'deposit'
}
export const TYPE = [TransactionType.Withdraw, TransactionType.RequestWithdraw, TransactionType.Deposit]

export interface TransactionUpdateDepositInterface {
    notes?: string
}

export interface TransactionUpdateCustomerInterface {
    mobileNumber: string
    notes?: string
}

export interface TransactionInterface {
    transactionId?: string
    status: TransactionStatus
    mobileNumber?: string
    customerId?: string
    payerBankAccountNumber: string
    payerBankName: string
    recipientBankAccountNumber: string
    recipientBankName: string
    companyBankId?: string
    amount: number
    transactionType: TransactionType
    adminId?: string
    notes?: string
    createdAt?: Date
    updatedAt?: Date
}

export const createTransaction = (data: TransactionInterface) => 
    axios({
        method: 'post',
        url: '/transaction/register',
        headers: { Authorization: `Bearer ${getAccessToken()}` },
        data
    })

export const updateTransaction = (transactionId: string, data: TransactionUpdateDepositInterface) => 
    axios({
        method: 'patch',
        url: `/transaction/update/${transactionId}`,
        headers: { Authorization: `Bearer ${getAccessToken()}` },
        data
    })

export const getDepositList = async (
    query: string,
    next: (depositList: TransactionInterface[]) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
			const res = await axios({
                method: 'get',
                url: `/transaction/deposit/list${query}`,
                headers: { Authorization: `Bearer ${getAccessToken()}` },
            })
            next(res.data)
        } catch (error: any) {
            handleError(error)
        }
})

export const deleteTransaction = async (
    transactionId: string,
    next: () => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
			await axios({
                method: 'delete',
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                url: '/transaction/delete/soft',
                data: { transactionId }
            })
            next()
		} catch (error: any) {
			handleError(error)
		}
    })
