import {
  InitialState,
  STORE_DEPOSIT_LIST,
  STORE_DEPOSIT_LIST_QUERY
} from 'redux/deposit/types'
import { DepositActionTypes } from './types'

const INITIAL_STATE: InitialState = {
  depositList: [],
  depositQuery: {
    keyword: '',
    status: '',
    bankName: '',
    start: '',
    end: '',
    min: '',
    max: ''
  },
}

const depositReducer = (state = INITIAL_STATE, action: DepositActionTypes): InitialState => {
  switch (action.type) {
    case STORE_DEPOSIT_LIST:
      return {
        ...state,
        depositList: action.payload
      }
    case STORE_DEPOSIT_LIST_QUERY:
      return {
        ...state,
        depositQuery: action.payload
      }
    default:
      return state
  }
}

export default depositReducer
