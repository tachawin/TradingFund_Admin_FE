import { CompanyBankInterface } from 'common/apis/companyBank'
import {
  CompanyBankActionTypes,
  STORE_COMPANY_BANK,
  STORE_COMPANY_BANK_QUERY
} from 'redux/companyBank/types'

export const storeCompanyBank = (companyBank: CompanyBankInterface[]): CompanyBankActionTypes => ({
  type: STORE_COMPANY_BANK,
  payload: companyBank,
})

export const storeCompanyBankQuery = (companyBankQuery: { [key: string]: string }): CompanyBankActionTypes => ({
  type: STORE_COMPANY_BANK_QUERY,
  payload: companyBankQuery,
})
