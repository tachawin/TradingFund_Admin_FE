export const STORE_COMPANY_BANK_QUERY = 'STORE_COMPANY_BANK_QUERY'

export interface InitialState {
  companyBankQuery: { [key: string] : string }
}

interface StoreCompanyBankQuery {
  type: typeof STORE_COMPANY_BANK_QUERY
  payload: { [key: string] : string }
}

export type CompanyBankActionTypes = StoreCompanyBankQuery
