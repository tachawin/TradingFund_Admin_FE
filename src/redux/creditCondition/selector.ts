import { createSelector } from 'reselect'

import { RootState } from 'redux/store'
import { InitialState } from './types'

const selectCreditCondition = (state: RootState) => state.creditCondition

export const selectCreditConditions = createSelector([selectCreditCondition], (creditCondition: InitialState) => creditCondition.creditConditions)
export const selectCreditConditionQuery = createSelector([selectCreditCondition], (creditCondition: InitialState) => creditCondition.creditConditionQuery)
