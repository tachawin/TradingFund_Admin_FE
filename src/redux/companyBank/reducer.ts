import {
  InitialState,
  CompanyBankActionTypes,
  STORE_COMPANY_BANK_QUERY,
  STORE_COMPANY_BANK,
  UPDATE_COMPANY_BANK,
  DELETE_COMPANY_BANK,
  ADD_COMPANY_BANK
} from 'redux/companyBank/types'
import { editItemById, removeItemById } from 'redux/utils'

const INITIAL_STATE: InitialState = {
  companyBank: [],
  companyBankQuery: {
    keyword: '',
    type: '',
    status: '',
    startCreated: '',
    endCreated: '',
  },
}

const companyBankReducer = (state = INITIAL_STATE, action: CompanyBankActionTypes): InitialState => {
  switch (action.type) {
    case ADD_COMPANY_BANK:
      return {
        ...state,
        companyBank: [action.payload, ...state.companyBank]
      }
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
    case UPDATE_COMPANY_BANK:
      return {
        ...state,
        companyBank: editItemById(state.companyBank, action.id, 'bankId', action.payload)
      }
    case DELETE_COMPANY_BANK:
      return {
        ...state,
        companyBank: removeItemById(state.companyBank, action.payload, 'bankId')
      }
    default:
      return state
  }
}

export default companyBankReducer
