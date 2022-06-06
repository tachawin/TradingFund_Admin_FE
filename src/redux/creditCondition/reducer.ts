import {
  ADD_CREDIT_CONDITION,
  DELETE_CREDIT_CONDITION,
  InitialState,
  CreditConditionActionTypes,
  STORE_CREDIT_CONDITIONS,
  STORE_CREDIT_CONDITION_QUERY,
  UPDATE_CREDIT_CONDITION
} from 'redux/creditCondition/types'
import { editItemById, removeItemById } from 'redux/utils'

const INITIAL_STATE: InitialState = {
  creditConditions: [],
  creditConditionQuery: {
    keyword: '',
    startCreated: '',
    endCreated: '',
    startUpdated: '',
    endUpdated: '',
    minCredit: '',
    maxCredit: '',
    minPoint: '',
    maxPoint: '',
    minQuantity: '',
    maxQuantity: ''
  },
}

const creditConditionReducer = (state = INITIAL_STATE, action: CreditConditionActionTypes): InitialState => {
  switch (action.type) {
    case STORE_CREDIT_CONDITIONS:
      return {
        ...state,
        creditConditions: action.payload
      }
    case STORE_CREDIT_CONDITION_QUERY:
      return {
        ...state,
        creditConditionQuery: action.payload
      }
    case ADD_CREDIT_CONDITION:
      return {
        ...state,
        creditConditions: [action.payload, ...state.creditConditions]
      }
    case UPDATE_CREDIT_CONDITION:
      return {
        ...state,
        creditConditions: editItemById(state.creditConditions, action.id, 'conditionId', action.payload)
      }
    case DELETE_CREDIT_CONDITION:
      return {
        ...state,
        creditConditions: removeItemById(state.creditConditions, action.payload, 'conditionId')
      }
    default:
      return state
  }
}

export default creditConditionReducer
