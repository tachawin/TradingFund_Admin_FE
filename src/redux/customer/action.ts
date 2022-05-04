import { CustomerInterface } from 'common/apis/customer'
import {
  CustomerActionTypes,
  ADD_CUSTOMER,
  STORE_CUSTOMERS,
  STORE_CUSTOMER_QUERY,
  STORE_CUSTOMER_MOBILE_NUMBER
} from 'redux/customer/types'

export const addCustomer = (customer: CustomerInterface): CustomerActionTypes => ({
  type: ADD_CUSTOMER,
  payload: customer,
})

export const storeCustomers = (customers: CustomerInterface[]): CustomerActionTypes => ({
  type: STORE_CUSTOMERS,
  payload: customers,
})

export const storeCustomerQuery = (customerQuery: { [key: string]: string }): CustomerActionTypes => ({
  type: STORE_CUSTOMER_QUERY,
  payload: customerQuery,
})

export const storeCustomerMobileNumber = (customerMobileNumber: string[]): CustomerActionTypes => ({
  type: STORE_CUSTOMER_MOBILE_NUMBER,
  payload: customerMobileNumber,
})
