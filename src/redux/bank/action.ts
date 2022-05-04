import { CommonBankInterface } from 'common/apis/commonBank'
import {
  CommonBankActionTypes,
  STORE_COMMON_BANKS,
} from 'redux/bank/types'

export const storeBank = (banks: CommonBankInterface): CommonBankActionTypes => ({
  type: STORE_COMMON_BANKS,
  payload: banks,
})
