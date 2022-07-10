import { RedeemInterface } from 'common/apis/redeem'

export const STORE_REDEEM_PRODUCT_LIST = 'STORE_REDEEM_PRODUCT_LIST'
export const STORE_REDEEM_PRODUCT_QUERY = 'STORE_REDEEM_PRODUCT_QUERY'
export const REMOVE_REDEEM_PRODUCT = 'REMOVE_REDEEM_PRODUCT'

export interface InitialState {
  redeemProductList: RedeemInterface[]
  query: { [key: string] : string }
}

interface StoreRedeemProductList {
  type: typeof STORE_REDEEM_PRODUCT_LIST
  payload: RedeemInterface[]
}

interface StoreRedeemProductQuery {
  type: typeof STORE_REDEEM_PRODUCT_QUERY
  payload: { [key: string] : string }
}

interface RemoveRedeemProduct {
  type: typeof REMOVE_REDEEM_PRODUCT
  payload: string
}

export type RedeemProductActionTypes = StoreRedeemProductList | StoreRedeemProductQuery | RemoveRedeemProduct
