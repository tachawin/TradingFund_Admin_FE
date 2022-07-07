import { TransactionInterface } from '../../common/apis/transaction'

export const STORE_WITHDRAW_LIST = 'STORE_WITHDRAW_LIST'
export const STORE_WITHDRAW_LIST_QUERY = 'STORE_WITHDRAW_LIST_QUERY'
export const REMOVE_WITHDRAW = 'REMOVE_WITHDRAW'
export interface InitialState {
  withdrawList: TransactionInterface[]
  withdrawQuery: { [key: string] : string }
}

interface StoreWithdrawList {
  type: typeof STORE_WITHDRAW_LIST
  payload: TransactionInterface[]
}

interface StoreWithdrawtListQuery {
  type: typeof STORE_WITHDRAW_LIST_QUERY
  payload: { [key: string] : string }
}

interface RemoveWithdraw {
  type: typeof REMOVE_WITHDRAW
  payload: string
}

export type WithdrawActionTypes = StoreWithdrawList | StoreWithdrawtListQuery | RemoveWithdraw
