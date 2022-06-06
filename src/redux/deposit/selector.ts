import { createSelector } from 'reselect'

import { RootState } from 'redux/store'
import { InitialState } from './types'

const selectDeposit = (state: RootState) => state.deposit

export const selectDepositList = createSelector([selectDeposit], (deposit: InitialState) => deposit.depositList)
export const selectDepositQuery = createSelector([selectDeposit], (deposit: InitialState) => deposit.depositQuery)
