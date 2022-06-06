import { CompanyBankInterface } from 'common/apis/companyBank'

export const ADD_COMPANY_BANK = 'ADD_COMPANY_BANK'
export const STORE_COMPANY_BANK = 'STORE_COMPANY_BANK'
export const STORE_COMPANY_BANK_QUERY = 'STORE_COMPANY_BANK_QUERY'
export const UPDATE_COMPANY_BANK = 'UPDATE_COMPANY_BANK'
export const DELETE_COMPANY_BANK = 'DELETE_COMPANY_BANK'

export interface InitialState {
  companyBank: CompanyBankInterface[]
  companyBankQuery: { [key: string] : string }
}

interface AddCompanyBank {
  type: typeof ADD_COMPANY_BANK
  payload: CompanyBankInterface
}

interface StoreCompanyBank {
  type: typeof STORE_COMPANY_BANK
  payload: CompanyBankInterface[]
}

interface StoreCompanyBankQuery {
  type: typeof STORE_COMPANY_BANK_QUERY
  payload: { [key: string] : string }
}

interface UpdateCompanyBank {
  type: typeof UPDATE_COMPANY_BANK
  id: string
  payload: CompanyBankInterface
}

interface DeleteCompanyBank {
  type: typeof DELETE_COMPANY_BANK
  payload: string
}

export type CompanyBankActionTypes = AddCompanyBank | StoreCompanyBank | StoreCompanyBankQuery | UpdateCompanyBank | DeleteCompanyBank
