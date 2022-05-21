import { TransactionInterface } from 'common/apis/transaction'
import { WithdrawActionTypes, STORE_WITHDRAW_LIST_QUERY, STORE_WITHDRAW_REQUEST_LIST, STORE_WITHDRAW_HISTORY_LIST } from './types'

export const storeWithdrawRequestList = (withdrawList: TransactionInterface[]): WithdrawActionTypes => ({
  type: STORE_WITHDRAW_REQUEST_LIST,
  payload: withdrawList,
})

export const storeWithdrawHistoryList = (withdrawList: TransactionInterface[]): WithdrawActionTypes => ({
  type: STORE_WITHDRAW_HISTORY_LIST,
  payload: withdrawList,
})

export const storeWithdrawQuery = (withdrawQuery: { [key: string]: string }): WithdrawActionTypes => ({
  type: STORE_WITHDRAW_LIST_QUERY,
  payload: withdrawQuery,
})
