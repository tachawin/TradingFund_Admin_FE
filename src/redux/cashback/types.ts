import { CashbackInterface } from 'common/apis/cashback'

export const STORE_CASHBACK_LIST = 'STORE_CASHBACK_LIST'
export const STORE_CASHBACK_LIST_QUERY = 'STORE_CASHBACK_LIST_QUERY'

export interface InitialState {
  cashbackList: CashbackInterface[]
  cashbackQuery: { [key: string] : string }
}

interface StoreCashbackList {
  type: typeof STORE_CASHBACK_LIST
  payload: CashbackInterface[]
}

interface StoreCashbacktListQuery {
  type: typeof STORE_CASHBACK_LIST_QUERY
  payload: { [key: string] : string }
}

export type CashbackActionTypes = StoreCashbackList | StoreCashbacktListQuery
