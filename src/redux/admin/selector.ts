import { createSelector } from 'reselect'

import { RootState } from 'redux/store'
import { InitialState } from './types'

const selectAdmin = (state: RootState) => state.admin

export const selectAdmins = createSelector([selectAdmin], (admin: InitialState) => admin.admins)
