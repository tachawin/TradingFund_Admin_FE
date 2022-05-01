import { combineReducers } from 'redux'
import companyBankReducer from './companyBank/reducer'
import customerReducer from './customer/reducer'
import levelReducer from './level/reducer'

const rootReducer = combineReducers({
  companyBank: companyBankReducer,
  customer: customerReducer,
  level: levelReducer
})

export default rootReducer