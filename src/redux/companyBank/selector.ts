import { createSelector } from 'reselect'

import { RootState } from 'redux/store'
import { InitialState } from './types'

const selectBankQuery = (state: RootState) => state.companyBank

export const selectCompanyBankQuery = createSelector([selectBankQuery], (companyBank: InitialState) => companyBank.companyBankQuery)
