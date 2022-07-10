import { removeItemById } from 'redux/utils'
import { InitialState, RedeemCreditActionTypes, STORE_REDEEM_CREDIT_LIST, REMOVE_REDEEM_CREDIT, STORE_REDEEM_CREDIT_QUERY } from './types'

const INITIAL_STATE: InitialState = {
  redeemCreditList: [],
  query: {
    keyword: '',
    status: '',
    start: '',
    end: '',
    minPoint: '',
    maxPoint: '',
    minCredit: '',
    maxCredit: '',
  },
}

const redeemCreditReducer = (state = INITIAL_STATE, action: RedeemCreditActionTypes): InitialState => {
  switch (action.type) {
    case STORE_REDEEM_CREDIT_LIST:
      return {
        ...state,
        redeemCreditList: action.payload
      }
    case STORE_REDEEM_CREDIT_QUERY:
      return {
        ...state,
        query: action.payload
      }
    case REMOVE_REDEEM_CREDIT:
      return {
        ...state,
        redeemCreditList: removeItemById(state.redeemCreditList, action.payload, 'redeemId')
      }
    default:
      return state
  }
}

export default redeemCreditReducer
