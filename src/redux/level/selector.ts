import { createSelector } from 'reselect'

import { RootState } from 'redux/store'
import { InitialState } from './types'

const selectLevel = (state: RootState) => state.level

export const selectLevels = createSelector([selectLevel], (level: InitialState) => level.levels)
export const selectCompanyLevelQuery = createSelector([selectLevel], (level: InitialState) => level.levelQuery)
