import {
  CompanyBankActionTypes,
  STORE_COMPANY_BANK_QUERY
} from 'redux/companyBank/types'

export const storeCompanyBankQuery = (companyBankQuery: { [key: string]: string }): CompanyBankActionTypes => ({
  type: STORE_COMPANY_BANK_QUERY,
  payload: companyBankQuery,
})
