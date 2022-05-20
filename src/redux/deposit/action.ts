import { DepositCreateInterface, DepositUpdateInterface } from 'common/apis/deposit'
import { TransactionInterface } from 'common/apis/transaction'
import { ADD_DEPOSIT, DepositActionTypes, STORE_DEPOSIT_LIST, STORE_DEPOSIT_LIST_QUERY, UPDATE_DEPOSIT } from './types'

export const storeDepositList = (depositList: TransactionInterface[]): DepositActionTypes => ({
  type: STORE_DEPOSIT_LIST,
  payload: depositList,
})

export const storeDepositQuery = (depositQuery: { [key: string]: string }): DepositActionTypes => ({
  type: STORE_DEPOSIT_LIST_QUERY,
  payload: depositQuery,
})

export const addNewDeposit = (data: DepositCreateInterface & {
  payerBankAccountNumber: string
  recipientBankAccountNumber: string
  recipientBankName: string
}) => ({
  type: ADD_DEPOSIT,
  payload: data
})

export const updateDepositById = (id: string, data: DepositUpdateInterface): DepositActionTypes => ({
  type: UPDATE_DEPOSIT,
  id,
  payload: data
})