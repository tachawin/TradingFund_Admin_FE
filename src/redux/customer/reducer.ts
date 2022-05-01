import {
  InitialState,
  CustomerActionTypes,
  ADD_CUSTOMER,
  STORE_CUSTOMERS,
  STORE_CUSTOMER_QUERY
} from 'redux/customer/types'

const INITIAL_STATE: InitialState = {
  customers: [],
  customerQuery: {
    bank: '',
    level: '',
    keyword: '',
    startCreated: '',
    endCreated: '',
    startLastLogin: '',
    endLastLogin: '',
  },
}

const customerReducer = (state = INITIAL_STATE, action: CustomerActionTypes): InitialState => {
  switch (action.type) {
    case ADD_CUSTOMER:
      return {
        ...state,
        customers: [action.payload, ...state.customers]
      }
    case STORE_CUSTOMERS:
      return {
        ...state,
        customers: action.payload
      }
    case STORE_CUSTOMER_QUERY:
      return {
        ...state,
        customerQuery: action.payload
      }
    default:
      return state
  }
}

export default customerReducer
