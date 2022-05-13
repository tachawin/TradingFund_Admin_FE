import { TransactionInterface } from 'common/apis/transaction'
import { DepositActionTypes, STORE_DEPOSIT_LIST, STORE_DEPOSIT_LIST_QUERY } from './types'

export const storeDepositList = (depositList: TransactionInterface[]): DepositActionTypes => ({
  type: STORE_DEPOSIT_LIST,
  payload: depositList,
})

export const storeDepositQuery = (depositQuery: { [key: string]: string }): DepositActionTypes => ({
  type: STORE_DEPOSIT_LIST_QUERY,
  payload: depositQuery,
})
