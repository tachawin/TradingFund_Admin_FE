import { removeItemById } from 'redux/utils'
import { InitialState, STORE_LIST_QUERY, RedeemProductActionTypes, STORE_REDEEM_PRODUCT_LIST, REMOVE_REDEEM_PRODUCT } from './types'

const INITIAL_STATE: InitialState = {
  redeemProductList: [],
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

const redeemProductReducer = (state = INITIAL_STATE, action: RedeemProductActionTypes): InitialState => {
  switch (action.type) {
    case STORE_REDEEM_PRODUCT_LIST:
      return {
        ...state,
        redeemProductList: action.payload
      }
    case STORE_LIST_QUERY:
      return {
        ...state,
        query: action.payload
      }
    case REMOVE_REDEEM_PRODUCT:
      return {
        ...state,
        redeemProductList: removeItemById(state.redeemProductList, action.payload, 'redeemId')
      }
    default:
      return state
  }
}

export default redeemProductReducer
