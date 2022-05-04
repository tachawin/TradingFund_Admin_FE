import { createSelector } from 'reselect'

import { RootState } from 'redux/store'
import { InitialState } from './types'

const selectCompanyBank = (state: RootState) => state.companyBank

export const selectCompanyBankList = createSelector([selectCompanyBank], (companyBank: InitialState) => companyBank.companyBank)
export const selectCompanyBankQuery = createSelector([selectCompanyBank], (companyBank: InitialState) => companyBank.companyBankQuery)
