import { combineReducers } from 'redux'
import companyBankReducer from './companyBank/reducer'

const rootReducer = combineReducers({
  companyBank: companyBankReducer,
})

export default rootReducer