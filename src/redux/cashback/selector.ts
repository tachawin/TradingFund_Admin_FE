import { createSelector } from 'reselect'

import { RootState } from 'redux/store'
import { InitialState } from './types'

const selectCashback = (state: RootState) => state.cashback

export const selectCashbackList = createSelector([selectCashback], (cashback: InitialState) => cashback.cashbackList)
export const selectCashbackQuery = createSelector([selectCashback], (cashback: InitialState) => cashback.cashbackQuery)
