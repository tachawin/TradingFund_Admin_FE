import { combineReducers } from 'redux'
import companyBankReducer from './companyBank/reducer'
import levelReducer from './level/reducer'

const rootReducer = combineReducers({
  companyBank: companyBankReducer,
  level: levelReducer
})

export default rootReducer