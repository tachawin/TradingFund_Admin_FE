import { createSelector } from 'reselect'

import { RootState } from 'redux/store'
import { InitialState } from './types'

const selectWithdraw = (state: RootState) => state.withdraw

export const selectWithdrawList = createSelector([selectWithdraw], (withdraw: InitialState) => withdraw.withdrawList)
export const selectWithdrawQuery = createSelector([selectWithdraw], (withdraw: InitialState) => withdraw.withdrawQuery)
