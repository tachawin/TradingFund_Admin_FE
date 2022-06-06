import { CustomerInterface } from '../../common/apis/customer'

export const ADD_CUSTOMER = 'ADD_CUSTOMER'
export const STORE_CUSTOMERS = 'STORE_CUSTOMERS'
export const STORE_CUSTOMER_QUERY = 'STORE_CUSTOMER_QUERY'
export const STORE_CUSTOMER_MOBILE_NUMBER = 'STORE_CUSTOMER_MOBILE_NUMBER'

export interface InitialState {
  customers: CustomerInterface[]
  customerQuery: { [key: string] : string }
  customerMobileNumber: string[]
}

interface AddCustomer {
  type: typeof ADD_CUSTOMER
  payload: CustomerInterface
}

interface StoreCustomers {
  type: typeof STORE_CUSTOMERS
  payload: CustomerInterface[]
}

interface StoreCustomerQuery {
  type: typeof STORE_CUSTOMER_QUERY
  payload: { [key: string] : string }
}

interface StoreCustomerMobileNumber {
  type: typeof STORE_CUSTOMER_MOBILE_NUMBER
  payload: string[]
}

export type CustomerActionTypes = AddCustomer | StoreCustomers | StoreCustomerQuery | StoreCustomerMobileNumber
