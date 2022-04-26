import { getAccessToken } from 'common/utils/auth'
import axios, { authorizationHandler } from './axios'

export enum CompanyBankStatus {
    Active = 'active',
    Inactive = 'inactive'
}

export enum CompanyBankType {
    Deposit = 'deposit',
    Withdraw = 'withdraw',
    DepositAndWithdraw = 'deposit_and_withdraw'
}

export interface CompanyBankBaseInterface {
    bankAccountName: string
    bankAccountNumber: string
    bankName: string
    balance: number
    type: CompanyBankType
    status: CompanyBankStatus
}

export interface CompanyBankUpdateBodyInterface {
    bankAccountName?: string
    bankAccountNumber?: string
    bankName?: string
    balance?: number
    type?: CompanyBankType
    status?: CompanyBankStatus
}

export interface CompanyBankInterface extends CompanyBankBaseInterface {
    bankId?: string
    createdAt?: Date
    updatedAt?: Date
}

export const createCompanyBank = (data: CompanyBankInterface) => 
    axios({
        method: 'post',
        url: '/company_bank/create',
        headers: { Authorization: `Bearer ${getAccessToken()}` },
        data
    })

export const updateCompanyBank = async (
    bankId: string,
    data: CompanyBankUpdateBodyInterface,
    next: () => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
			await axios({
                method: 'get',
                url: `/company_bank/update/${bankId}`,
                data
            })
            next()
		} catch (error: any) {
			handleError(error)
		}
    })

export const deleteCompanyBank = async (
    bankId: string,
    next: () => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
			await axios({
                method: 'get',
                url: '/company_bank/delete',
                data: { bankId }
            })
            next()
		} catch (error: any) {
			handleError(error)
		}
    })
