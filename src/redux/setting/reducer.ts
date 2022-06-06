import { InitialState, STORE_SYSTEM_SETTING, SystemSettingActionTypes, TOGGLE_OTP_SETTING, UPDATE_REFERRAL_SETTING } from './types'

const INITIAL_STATE: InitialState = {
  flagOTP: {
    admin: true,
    customer: true
  },
  referral: {
    firstLevel: 0,
    secondLevel: 0,
  }
}

const systemSettingReducer = (state = INITIAL_STATE, action: SystemSettingActionTypes): InitialState => {
  switch (action.type) {
    case STORE_SYSTEM_SETTING:
      return action.payload
    case TOGGLE_OTP_SETTING:
      return {
        ...state,
        flagOTP: {
          ...state.flagOTP,
          [action.serviceType]: action.payload
        }
      }
    case UPDATE_REFERRAL_SETTING:
      return {
        ...state,
        referral: action.payload
      }
    default:
      return state
  }
}

export default systemSettingReducer
