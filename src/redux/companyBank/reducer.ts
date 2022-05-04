import {
  InitialState,
  CompanyBankActionTypes,
  STORE_COMPANY_BANK_QUERY,
  STORE_COMPANY_BANK
} from 'redux/companyBank/types'

const INITIAL_STATE: InitialState = {
  companyBank: [],
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
    case STORE_COMPANY_BANK:
      return {
        ...state,
        companyBank: action.payload
      }
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
