import { TransactionInterface } from '../../common/apis/deposit'

export const STORE_DEPOSIT_LIST = 'STORE_DEPOSIT_LIST'
export const STORE_DEPOSIT_LIST_QUERY = 'STORE_DEPOSIT_LIST_QUERY'

export interface InitialState {
  depositList: TransactionInterface[]
  depositQuery: { [key: string] : string }
}

interface StoreDepositList {
  type: typeof STORE_DEPOSIT_LIST
  payload: TransactionInterface[]
}

interface StoreDepositListQuery {
  type: typeof STORE_DEPOSIT_LIST_QUERY
  payload: { [key: string] : string }
}

export type DepositActionTypes = StoreDepositList | StoreDepositListQuery
