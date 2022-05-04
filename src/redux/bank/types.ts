import { CommonBankInterface } from 'common/apis/commonBank'

export const STORE_COMMON_BANKS = 'STORE_COMMON_BANKS'

export interface InitialState {
  commonBanks: CommonBankInterface
}

interface StoreCommonBanks {
  type: typeof STORE_COMMON_BANKS
  payload: CommonBankInterface
}

export type CommonBankActionTypes = StoreCommonBanks
