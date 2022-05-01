import {
  InitialState,
  CompanyBankActionTypes,
  STORE_COMPANY_BANK_QUERY
} from 'redux/companyBank/types'

const INITIAL_STATE: InitialState = {
  companyBankQuery: {
    keyword: '',
    type: '',
    status: '',
    bankName: '',
    startCreated: '',
    endCreated: '',
  },
}

const companyBankReducer = (state = INITIAL_STATE, action: CompanyBankActionTypes): InitialState => {
  switch (action.type) {
    case STORE_COMPANY_BANK_QUERY:
      return {
        ...state,
        companyBankQuery: action.payload,
      }
    default:
      return state
  }
}

export default companyBankReducer
