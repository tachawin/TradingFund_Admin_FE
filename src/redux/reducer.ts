import { combineReducers } from 'redux'
import companyBankReducer from './companyBank/reducer'
import customerReducer from './customer/reducer'
import levelReducer from './level/reducer'
import productReducer from './product/reducer'

const rootReducer = combineReducers({
  companyBank: companyBankReducer,
  customer: customerReducer,
  level: levelReducer,
  product: productReducer,
})

export default rootReducer