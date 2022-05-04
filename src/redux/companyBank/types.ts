import { CompanyBankInterface } from 'common/apis/companyBank'

export const STORE_COMPANY_BANK = 'STORE_COMPANY_BANK'
export const STORE_COMPANY_BANK_QUERY = 'STORE_COMPANY_BANK_QUERY'

export interface InitialState {
  companyBank: CompanyBankInterface[]
  companyBankQuery: { [key: string] : string }
}

interface StoreCompanyBank {
  type: typeof STORE_COMPANY_BANK
  payload: CompanyBankInterface[]
}

interface StoreCompanyBankQuery {
  type: typeof STORE_COMPANY_BANK_QUERY
  payload: { [key: string] : string }
}

export type CompanyBankActionTypes = StoreCompanyBank | StoreCompanyBankQuery
