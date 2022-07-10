import {
  InitialState,
  CustomerActionTypes,
  ADD_CUSTOMER,
  STORE_CUSTOMERS,
  STORE_CUSTOMER_QUERY,
  STORE_CUSTOMER_MOBILE_NUMBER
} from 'redux/customer/types'

const INITIAL_STATE: InitialState = {
  customers: [],
  customerQuery: {
    level: '',
    keyword: '',
    startCreated: '',
    endCreated: '',
    startLastLogin: '',
    endLastLogin: '',
  },
  customerMobileNumber: []
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
    case STORE_CUSTOMER_MOBILE_NUMBER:
      return {
        ...state,
        customerMobileNumber: action.payload
      }
    default:
      return state
  }
}

export default customerReducer
