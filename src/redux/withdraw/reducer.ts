import { InitialState, STORE_WITHDRAW_HISTORY_LIST, STORE_WITHDRAW_LIST_QUERY, STORE_WITHDRAW_REQUEST_LIST, WithdrawActionTypes } from './types'

const INITIAL_STATE: InitialState = {
  withdrawRequestList: [],
  withdrawHistoryList: [],
  withdrawQuery: {
    keyword: '',
    status: '',
    bankName: '',
    start: '',
    end: '',
    min: '',
    max: ''
  },
}

const withdrawReducer = (state = INITIAL_STATE, action: WithdrawActionTypes): InitialState => {
  switch (action.type) {
    case STORE_WITHDRAW_REQUEST_LIST:
      return {
        ...state,
        withdrawRequestList: action.payload
      }
    case STORE_WITHDRAW_HISTORY_LIST:
      return {
        ...state,
        withdrawHistoryList: action.payload
      }
    case STORE_WITHDRAW_LIST_QUERY:
      return {
        ...state,
        withdrawQuery: action.payload
      }
    default:
      return state
  }
}

export default withdrawReducer
