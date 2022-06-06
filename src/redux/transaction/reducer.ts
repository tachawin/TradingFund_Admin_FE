import { TransactionActionTypes, InitialState, STORE_TRANSACTIONS, STORE_TRANSACTION_QUERY } from './types'

const INITIAL_STATE: InitialState = {
  transactions: [],
  transactionQuery: {
    keyword: '',
    bank: '',
    transactionType: '',
    min: '',
    max: '',
    startCreated: '',
    endCreated: '',
  },
}

const transactionReducer = (state = INITIAL_STATE, action: TransactionActionTypes): InitialState => {
  switch (action.type) {
    case STORE_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload
      }
    case STORE_TRANSACTION_QUERY:
      return {
        ...state,
        transactionQuery: action.payload
      }
    default:
      return state
  }
}

export default transactionReducer
