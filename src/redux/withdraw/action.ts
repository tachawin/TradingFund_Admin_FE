import { TransactionInterface } from 'common/apis/transaction'
import { WithdrawActionTypes, STORE_WITHDRAW_LIST_QUERY, STORE_WITHDRAW_LIST } from './types'

export const storeWithdrawList = (withdrawList: TransactionInterface[]): WithdrawActionTypes => ({
  type: STORE_WITHDRAW_LIST,
  payload: withdrawList,
})

export const storeWithdrawQuery = (withdrawQuery: { [key: string]: string }): WithdrawActionTypes => ({
  type: STORE_WITHDRAW_LIST_QUERY,
  payload: withdrawQuery,
})
