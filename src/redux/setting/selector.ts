import { createSelector } from 'reselect'

import { RootState } from 'redux/store'
import { InitialState } from './types'

const selectSystemSetting = (state: RootState) => state.systemSetting

export const selectOTPSetting = createSelector([selectSystemSetting], (systemSetting: InitialState) => systemSetting.flagOTP)
export const selectReferralSetting = createSelector([selectSystemSetting], (systemSetting: InitialState) => systemSetting.referral)
