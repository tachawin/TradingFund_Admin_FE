import { getAccessToken } from 'common/utils/auth'
import axios, { authorizationHandler } from './axios'

export enum CustomerStatus {
    Active = 'active',
    Inactive = 'inactive'
}
export const STATUS = [CustomerStatus.Active, CustomerStatus.Inactive]

interface CustomerBaseInterface {
    name: string
    mobileNumber: string
    bankAccountName: string
    bankAccountNumber: string
    bankName: string
}

export interface CustomerInterface extends CustomerBaseInterface {
    customerId?: string
    createdAt?: Date
    updatedAt?: Date
    lastLoginAt?: Date
    password?: string
    credit?: number,
    point?: number,
    cashbackBonus?: number,
    referralBonus?: number,
    lastDepositAmount?: number,
    level?: {
        levelId?: string
        levelName?: string
        color?: string
    }
}

export const createCustomer = (data: CustomerInterface) => 
    axios({
        method: 'post',
        url: '/customer/create',
        headers: { Authorization: `Bearer ${getAccessToken()}` },
        data
    })

export const getCustomerList = async (
    query: string,
    next: (customerList: CustomerInterface[]) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
			const res = await axios({
                method: 'get',
                url: `/customer/list${query}`,
                headers: { Authorization: `Bearer ${getAccessToken()}` },
            })
            next(res.data)
        } catch (error: any) {
            handleError(error)
        }
})

export const getCustomer = async (
    customerId: string,
    next: (customer: CustomerInterface) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `/customer/${customerId}`,
                headers: { Authorization: `Bearer ${getAccessToken()}` }
            })
            next(res.data)
        } catch (error: any) {
            handleError(error)
        }
})

export const getMobileNumberList = async (
    next: (mobileNumber: string[]) => void,
    handleError: (error: any) => void
) => 
    await authorizationHandler(async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `/customer_admin/mobile_number/list`,
                headers: { Authorization: `Bearer ${getAccessToken()}` }
            })
            next(res.data)
        } catch (error: any) {
            handleError(error)
        }
})