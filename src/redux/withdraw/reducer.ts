import { removeItemById } from 'redux/utils'
import { InitialState, REMOVE_WITHDRAW, STORE_WITHDRAW_LIST, STORE_WITHDRAW_LIST_QUERY, WithdrawActionTypes } from './types'

const INITIAL_STATE: InitialState = {
  withdrawList: [],
  withdrawQuery: {
    keyword: '',
    status: '',
    start: '',
    end: '',
    min: '',
    max: '',
    minLastDeposit: '',
    maxLastDeposit: '',
    companyBankId: '',
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
    case REMOVE_WITHDRAW:
      return {
        ...state,
        withdrawList: removeItemById(state.withdrawList, action.payload, 'transactionId')
      }
    default:
      return state
  }
}

export default withdrawReducer
