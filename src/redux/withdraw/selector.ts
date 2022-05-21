import { createSelector } from 'reselect'

import { RootState } from 'redux/store'
import { InitialState } from './types'

const selectWithdraw = (state: RootState) => state.withdraw

export const selectWithdrawRequestList = createSelector([selectWithdraw], (withdraw: InitialState) => withdraw.withdrawRequestList)
export const selectWithdrawHistoryList = createSelector([selectWithdraw], (withdraw: InitialState) => withdraw.withdrawHistoryList)
export const selectWithdrawQuery = createSelector([selectWithdraw], (withdraw: InitialState) => withdraw.withdrawQuery)
