import { TransactionInterface } from '../../common/apis/transaction'

export const STORE_WITHDRAW_REQUEST_LIST = 'STORE_WITHDRAW_REQUEST_LIST'
export const STORE_WITHDRAW_HISTORY_LIST = 'STORE_WITHDRAW_HISTORY_LIST'
export const STORE_WITHDRAW_LIST_QUERY = 'STORE_WITHDRAW_LIST_QUERY'

export interface InitialState {
  withdrawRequestList: TransactionInterface[]
  withdrawHistoryList: TransactionInterface[]
  withdrawQuery: { [key: string] : string }
}

interface StoreWithdrawRequestList {
  type: typeof STORE_WITHDRAW_REQUEST_LIST
  payload: TransactionInterface[]
}

interface StoreWithdrawHistoryList {
  type: typeof STORE_WITHDRAW_HISTORY_LIST
  payload: TransactionInterface[]
}

interface StoreWithdrawtListQuery {
  type: typeof STORE_WITHDRAW_LIST_QUERY
  payload: { [key: string] : string }
}

export type WithdrawActionTypes = StoreWithdrawRequestList | StoreWithdrawHistoryList | StoreWithdrawtListQuery
