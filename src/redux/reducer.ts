import { combineReducers } from 'redux'
import adminReducer from './admin/reducer'
import commonBankReducer from './bank/reducer'
import companyBankReducer from './companyBank/reducer'
import customerReducer from './customer/reducer'
import depositReducer from './deposit/reducer'
import levelReducer from './level/reducer'
import withdrawReducer from './withdraw/reducer'
import productReducer from './product/reducer'
import userReducer from './user/reducer'
import transactionReducer from './transaction/reducer'
import redeemCreditReducer from './redeemCredit/reducer'
import redeemProductReducer from './redeemProduct/reducer'
import systemSettingReducer from './setting/reducer'

const rootReducer = combineReducers({
  admin: adminReducer,
  commonBank: commonBankReducer,
  companyBank: companyBankReducer,
  customer: customerReducer,
  deposit: depositReducer,
  level: levelReducer,
  product: productReducer,
  redeemCredit: redeemCreditReducer,
  redeemProduct: redeemProductReducer,
  systemSetting: systemSettingReducer,
  transaction: transactionReducer,
  user: userReducer,
  withdraw: withdrawReducer
})

export default rootReducer