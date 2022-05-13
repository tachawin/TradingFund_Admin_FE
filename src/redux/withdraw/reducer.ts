import { InitialState, STORE_WITHDRAW_LIST, STORE_WITHDRAW_LIST_QUERY, WithdrawActionTypes } from './types'

const INITIAL_STATE: InitialState = {
  withdrawList: [],
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
    case STORE_WITHDRAW_LIST:
      return {
        ...state,
        withdrawList: action.payload
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
