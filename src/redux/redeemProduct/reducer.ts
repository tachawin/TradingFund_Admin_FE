import { InitialState, STORE_LIST_QUERY, RedeemProductActionTypes, STORE_REDEEM_PRODUCT_LIST } from './types'

const INITIAL_STATE: InitialState = {
  redeemProductList: [],
  query: {
    keyword: '',
    status: '',
    bankName: '',
    start: '',
    end: '',
    min: '',
    max: ''
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
    default:
      return state
  }
}

export default redeemProductReducer
