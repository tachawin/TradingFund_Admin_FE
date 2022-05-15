import { createSelector } from 'reselect'

import { RootState } from 'redux/store'
import { InitialState } from './types'

const selectUser = (state: RootState) => state.user

export const selectPermission = createSelector([selectUser], (user: InitialState) => user.features)
