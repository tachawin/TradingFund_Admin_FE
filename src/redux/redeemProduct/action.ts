import { RedeemInterface } from 'common/apis/redeem'
import { RedeemProductActionTypes, STORE_LIST_QUERY, STORE_REDEEM_PRODUCT_LIST } from './types'

export const storeRedeemProductList = (list: RedeemInterface[]): RedeemProductActionTypes => ({
  type: STORE_REDEEM_PRODUCT_LIST,
  payload: list,
})

export const storeRedeemProductQuery = (luery: { [key: string]: string }): RedeemProductActionTypes => ({
  type: STORE_LIST_QUERY,
  payload: luery,
})
