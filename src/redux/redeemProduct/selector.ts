import { createSelector } from 'reselect'

import { RootState } from 'redux/store'
import { InitialState } from './types'

const selectRedeemList = (state: RootState) => state.redeemProduct

export const selectRedeemProductList = createSelector([selectRedeemList], (redeemList: InitialState) => redeemList.redeemProductList)
export const selectRedeemProductQuery = createSelector([selectRedeemList], (redeemList: InitialState) => redeemList.query)
