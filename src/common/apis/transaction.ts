export enum TransactionStatus {
    Success = 'success',
    NotFound = 'not_found',
    Cancel = 'cancel',
}
export const STATUS = [TransactionStatus.Success, TransactionStatus.NotFound, TransactionStatus.Cancel]
export const WITHDRAW_STATUS = [TransactionStatus.Success, TransactionStatus.Cancel]

export enum TransactionType {
    Withdraw = 'withdraw',
    RequestWithdraw = 'request_withdraw',
    Deposit = 'deposit'
}
export const TYPE = [TransactionType.Withdraw, TransactionType.RequestWithdraw, TransactionType.Deposit]

interface Bank {
    id: number
    niceName: string
    officialName: string
    thaiName: string
    acronym: string
}

export interface TransactionInterface {
    transactionId?: string
    transactionTimestamp?: string
    status: TransactionStatus
    mobileNumber?: string
    customerId?: string
    payerBankAccountNumber: string
    payerBankName: string
    recipientBankAccountNumber: string
    recipientBankName: string
    companyBankId?: string
    amount: string
    transactionType: TransactionType
    adminId?: string
    notes?: string
    createdAt?: Date
    updatedAt?: Date
    payerBank?: Bank
    recipientBank?: Bank
    adminName?: string 
}
