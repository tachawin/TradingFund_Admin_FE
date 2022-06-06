import { createSelector } from 'reselect'

import { RootState } from 'redux/store'
import { InitialState } from './types'

const selectCustomer = (state: RootState) => state.customer

export const selectCustomers = createSelector([selectCustomer], (customer: InitialState) => customer.customers)
export const selectCustomerQuery = createSelector([selectCustomer], (customer: InitialState) => customer.customerQuery)
export const selectCustomerMobileNumber = createSelector([selectCustomer], (customer: InitialState) => customer.customerMobileNumber)