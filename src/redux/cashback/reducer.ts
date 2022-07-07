import { CashbackActionTypes, InitialState, STORE_CASHBACK_LIST, STORE_CASHBACK_LIST_QUERY } from './types'

const INITIAL_STATE: InitialState = {
  cashbackList: [],
  cashbackQuery: {},
}

const cashbackReducer = (state = INITIAL_STATE, action: CashbackActionTypes): InitialState => {
  switch (action.type) {
    case STORE_CASHBACK_LIST:
      return {
        ...state,
        cashbackList: action.payload
      }
    case STORE_CASHBACK_LIST_QUERY:
      return {
        ...state,
        cashbackQuery: action.payload
      }
    default:
      return state
  }
}

export default cashbackReducer
