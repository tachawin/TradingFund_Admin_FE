import { combineReducers } from 'redux'
import companyBankReducer from './companyBank/reducer'
import customerReducer from './customer/reducer'
import depositReducer from './deposit/reducer'
import levelReducer from './level/reducer'

const rootReducer = combineReducers({
  companyBank: companyBankReducer,
  customer: customerReducer,
  deposit: depositReducer,
  level: levelReducer
})

export default rootReducer