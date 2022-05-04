import { createSelector } from 'reselect'

import { RootState } from 'redux/store'
import { InitialState } from './types'

const selectCommonBanks = (state: RootState) => state.commonBank

export const selectCommonBanksList = createSelector([selectCommonBanks], (commonBank: InitialState) => commonBank.commonBanks)
