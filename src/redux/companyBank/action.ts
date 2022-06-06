import { CompanyBankInterface } from 'common/apis/companyBank'
import {
  ADD_COMPANY_BANK,
  CompanyBankActionTypes,
  DELETE_COMPANY_BANK,
  STORE_COMPANY_BANK,
  STORE_COMPANY_BANK_QUERY,
  UPDATE_COMPANY_BANK
} from 'redux/companyBank/types'

export const addCompanyBank = (companyBank: CompanyBankInterface): CompanyBankActionTypes => ({
  type: ADD_COMPANY_BANK,
  payload: companyBank,
})

export const storeCompanyBank = (companyBank: CompanyBankInterface[]): CompanyBankActionTypes => ({
  type: STORE_COMPANY_BANK,
  payload: companyBank,
})

export const storeCompanyBankQuery = (companyBankQuery: { [key: string]: string }): CompanyBankActionTypes => ({
  type: STORE_COMPANY_BANK_QUERY,
  payload: companyBankQuery,
})

export const updateCompanyBankById = (companyBankId: string, companyBank: CompanyBankInterface): CompanyBankActionTypes => ({
  type: UPDATE_COMPANY_BANK,
  id: companyBankId,
  payload: companyBank
})

export const deleteCompanyBankById = (companyBankId: string): CompanyBankActionTypes => ({
  type: DELETE_COMPANY_BANK,
  payload: companyBankId
})