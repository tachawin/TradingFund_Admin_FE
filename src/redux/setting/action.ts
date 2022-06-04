import { ReferralInterface, ServiceType, SystemSettingInterface } from 'common/apis/settings'
import { STORE_SYSTEM_SETTING, SystemSettingActionTypes, TOGGLE_OTP_SETTING, UPDATE_REFERRAL_SETTING } from './types'

export const storeSetting = (setting: SystemSettingInterface): SystemSettingActionTypes => ({
  type: STORE_SYSTEM_SETTING,
  payload: setting,
})

export const toggleOTPSetting = (serviceType: ServiceType, value: boolean): SystemSettingActionTypes => ({
  type: TOGGLE_OTP_SETTING,
  serviceType,
  payload: value
})

export const updateReferralSetting = (setting: ReferralInterface): SystemSettingActionTypes => ({
  type: UPDATE_REFERRAL_SETTING,
  payload: setting
})
