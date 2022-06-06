import { CommonBankActionTypes, InitialState, STORE_COMMON_BANKS } from './types'

const INITIAL_STATE: InitialState = {
  commonBanks: {},
}

const commonBankReducer = (state = INITIAL_STATE, action: CommonBankActionTypes): InitialState => {
  switch (action.type) {
    case STORE_COMMON_BANKS:
      return {
        ...state,
        commonBanks: action.payload
      }
    default:
      return state
  }
}

export default commonBankReducer
