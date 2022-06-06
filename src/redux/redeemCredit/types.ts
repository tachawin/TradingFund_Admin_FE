import { RedeemInterface } from 'common/apis/redeem'

export const STORE_REDEEM_CREDIT_LIST = 'STORE_REDEEM_CREDIT_LIST'
export const STORE_LIST_QUERY = 'STORE_LIST_QUERY'
export const REMOVE_REDEEM_CREDIT = 'REMOVE_REDEEM_CREDIT'

export interface InitialState {
  redeemCreditList: RedeemInterface[]
  query: { [key: string] : string }
}

interface StoreRedeemCreditList {
  type: typeof STORE_REDEEM_CREDIT_LIST
  payload: RedeemInterface[]
}

interface StoreListQuery {
  type: typeof STORE_LIST_QUERY
  payload: { [key: string] : string }
}

interface RemoveRedeemCredit {
  type: typeof REMOVE_REDEEM_CREDIT
  payload: string
}

export type RedeemCreditActionTypes = StoreRedeemCreditList | StoreListQuery | RemoveRedeemCredit
