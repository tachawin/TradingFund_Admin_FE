import { getAccessToken } from 'common/utils/auth'
import axios, { authorizationHandler } from './axios'
import { TransactionInterface } from './transaction'

export interface DepositUpdateInterface {
    notes?: string
    status?: string
}

export interface DepositUpdateCustomerInterface {
    mobileNumber: string
    notes?: string
}

export interface DepositCreateInterface {
    mobileNumber: string
    companyBankId: string
    amount: string
}

export const deposit = async (
    data: DepositCreateInterface, 
    next: () => void,
    handleError: (error: any) => void
) => 
    await authorizationHandler(async () => {
        try {
            await axios({
                method: 'post',
                url: '/transaction/deposit/action',
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                data
            })
            next()
        } catch (error: any) {
            handleError(error)
        }
    })
 

export const updateDeposit = async (
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

export const updateDepositCustomer = async (
    transactionId: string,
    data: DepositUpdateCustomerInterface,
    next: () => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
            await axios({
                method: 'patch',
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                url: `/transaction/deposit/pick/customer/${transactionId}`,
                data
            })
            next()
        } catch (error: any) {
            handleError(error)
        }
    })

export const waiveDeposit = async (
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
                url: `/transaction/deposit/waive/${transactionId}`,
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
                url: `/transaction/deposit/admin/list${query}`,
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
