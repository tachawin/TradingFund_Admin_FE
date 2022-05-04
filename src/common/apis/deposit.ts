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

export interface DepositUpdateInterface {
    notes?: string
}

export interface DepositUpdateCustomerInterface {
    mobileNumber: string
    notes?: string
}

export interface DepositCreateInterface {
    transactionTimestamp: string
    mobileNumber: string
    amount: number
    payerBankAccountNumber: string
    payerBankName: string
    companyBankId: string
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

export const requestDeposit = (data: TransactionInterface) => 
    axios({
        method: 'post',
        url: '/transaction/deposit/request',
        headers: { Authorization: `Bearer ${getAccessToken()}` },
        data
    })
 

export const updateTransaction = async (
    transactionId: string,
    data: DepositUpdateInterface,
    next: () => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
            await axios({
                method: 'patch',
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                url: `/transaction/deposit/note/${transactionId}`,
                data
            })
            next()
        } catch (error: any) {
            handleError(error)
        }
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
