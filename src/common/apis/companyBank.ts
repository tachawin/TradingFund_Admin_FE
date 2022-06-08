import { getAccessToken } from 'common/utils/auth'
import axios, { authorizationHandler } from './axios'

export enum CompanyBankStatus {
    Active = 'active',
    Inactive = 'inactive'
}

export const STATUS = [CompanyBankStatus.Active, CompanyBankStatus.Inactive]

export enum CompanyBankType {
    Deposit = 'deposit',
    Withdraw = 'withdraw',
    DepositAndWithdraw = 'deposit_and_withdraw'
}

export const TYPE = [CompanyBankType.Deposit, CompanyBankType.Withdraw, CompanyBankType.DepositAndWithdraw]

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
    bank?: {
        id: number
        officialName: string
        niceName: string
        thaiName: string
        acronym: string
    }
}

export const createCompanyBank = async (
    data: CompanyBankInterface,
    next: (companyBank: CompanyBankInterface) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
            const res = await axios({
                method: 'post',
                url: '/company_bank/create',
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                data
            })
            next(res.data)
        } catch (error: any) {
            handleError(error)
        }
    }
)

export const getCompanyBankList = async (
    query: string,
    next: (companyBankList: CompanyBankInterface[]) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `/company_bank/list${query}`,
                headers: { Authorization: `Bearer ${getAccessToken()}` },
            })
            next(res.data)
        } catch (error: any) {
            handleError(error)
        }
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
                method: 'patch',
                url: `/company_bank/update/${bankId}`,
                headers: { Authorization: `Bearer ${getAccessToken()}` },
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
                method: 'delete',
                url: '/company_bank/delete',
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                data: { bankId }
            })
            next()
		} catch (error: any) {
			handleError(error)
		}
    })
