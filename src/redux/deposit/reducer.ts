import { TransactionStatus, TransactionType } from 'common/apis/transaction'
import {
  ADD_DEPOSIT,
  InitialState,
  STORE_DEPOSIT_LIST,
  STORE_DEPOSIT_LIST_QUERY,
  UPDATE_DEPOSIT
} from 'redux/deposit/types'
import { editItemById } from 'redux/utils'
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
    case ADD_DEPOSIT:
      return {
        ...state,
        depositList: [{
          transactionType: TransactionType.Deposit,
          status: TransactionStatus.Success,
          payerBankName: '',
          ...action.payload
        }, ...state.depositList]
      }
    case UPDATE_DEPOSIT:
      return {
        ...state,
        depositList: editItemById(state.depositList, action.id, 'transactionId', action.payload)
      }
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
