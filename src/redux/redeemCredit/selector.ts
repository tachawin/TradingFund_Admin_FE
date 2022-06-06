import { createSelector } from 'reselect'

import { RootState } from 'redux/store'
import { InitialState } from './types'

const selectRedeemList = (state: RootState) => state.redeemCredit

export const selectRedeemCreditList = createSelector([selectRedeemList], (redeemList: InitialState) => redeemList.redeemCreditList)
export const selectRedeemCreditQuery = createSelector([selectRedeemList], (redeemList: InitialState) => redeemList.query)
