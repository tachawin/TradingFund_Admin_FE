import { RedeemInterface } from 'common/apis/redeem'
import { RedeemProductActionTypes, REMOVE_REDEEM_PRODUCT, STORE_LIST_QUERY, STORE_REDEEM_PRODUCT_LIST } from './types'

export const storeRedeemProductList = (list: RedeemInterface[]): RedeemProductActionTypes => ({
  type: STORE_REDEEM_PRODUCT_LIST,
  payload: list,
})

export const storeRedeemProductQuery = (query: { [key: string]: string }): RedeemProductActionTypes => ({
  type: STORE_LIST_QUERY,
  payload: query,
})

export const removeRedeemProductById = (redeemId: string): RedeemProductActionTypes => ({
  type: REMOVE_REDEEM_PRODUCT,
  payload: redeemId
})