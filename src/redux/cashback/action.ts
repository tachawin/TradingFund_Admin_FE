import { CashbackInterface } from 'common/apis/cashback'
import { CashbackActionTypes, STORE_CASHBACK_LIST_QUERY, STORE_CASHBACK_LIST } from './types'

export const storeCashbackList = (cashbackList: CashbackInterface[]): CashbackActionTypes => ({
  type: STORE_CASHBACK_LIST,
  payload: cashbackList,
})

export const storeCashbackQuery = (cashbackQuery: { [key: string]: string }): CashbackActionTypes => ({
  type: STORE_CASHBACK_LIST_QUERY,
  payload: cashbackQuery,
})