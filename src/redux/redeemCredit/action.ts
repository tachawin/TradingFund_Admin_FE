import { RedeemInterface } from 'common/apis/redeem'
import { RedeemCreditActionTypes, REMOVE_REDEEM_CREDIT, STORE_REDEEM_CREDIT_QUERY, STORE_REDEEM_CREDIT_LIST } from './types'

export const storeRedeemCreditList = (list: RedeemInterface[]): RedeemCreditActionTypes => ({
  type: STORE_REDEEM_CREDIT_LIST,
  payload: list,
})

export const storeRedeemCreditQuery = (luery: { [key: string]: string }): RedeemCreditActionTypes => ({
  type: STORE_REDEEM_CREDIT_QUERY,
  payload: luery,
})

export const removeRedeemCreditById = (redeemId: string): RedeemCreditActionTypes => ({
  type: REMOVE_REDEEM_CREDIT,
  payload: redeemId
})