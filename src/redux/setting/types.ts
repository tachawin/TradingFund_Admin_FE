import { ReferralInterface, ServiceType, SystemSettingInterface } from 'common/apis/settings'

export const STORE_SYSTEM_SETTING = 'STORE_SYSTEM_SETTING'
export const TOGGLE_OTP_SETTING = 'TOGGLE_OTP_SETTING'
export const UPDATE_REFERRAL_SETTING = 'UPDATE_REFERRAL_SETTING'

export type InitialState = SystemSettingInterface

interface StoreSystemSetting {
  type: typeof STORE_SYSTEM_SETTING
  payload: SystemSettingInterface
}

interface ToggleOTPSetting {
  type: typeof TOGGLE_OTP_SETTING
  serviceType: ServiceType
  payload: boolean
}

interface UpdateReferralSetting {
  type: typeof UPDATE_REFERRAL_SETTING
  payload: ReferralInterface
}

export type SystemSettingActionTypes = StoreSystemSetting | ToggleOTPSetting | UpdateReferralSetting
