import { TransactionInterface } from 'common/apis/transaction'
import { WithdrawActionTypes, STORE_WITHDRAW_LIST_QUERY, STORE_WITHDRAW_LIST, REMOVE_WITHDRAW } from './types'

export const storeWithdrawList = (withdrawList: TransactionInterface[]): WithdrawActionTypes => ({
  type: STORE_WITHDRAW_LIST,
  payload: withdrawList,
})

export const storeWithdrawQuery = (withdrawQuery: { [key: string]: string }): WithdrawActionTypes => ({
  type: STORE_WITHDRAW_LIST_QUERY,
  payload: withdrawQuery,
})

export const removeWithdrawById = (transactionId: string): WithdrawActionTypes => ({
  type: REMOVE_WITHDRAW,
  payload: transactionId
})