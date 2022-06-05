import { CreditConditionInterface, CreditConditionUpdateBodyInterface } from '../../common/apis/creditCondition'

export const STORE_CREDIT_CONDITIONS = 'STORE_CREDIT_CONDITIONS'
export const STORE_CREDIT_CONDITION_QUERY = 'STORE_CREDIT_CONDITION_QUERY'
export const ADD_CREDIT_CONDITION = 'ADD_CREDIT_CONDITION'
export const UPDATE_CREDIT_CONDITION = 'UPDATE_CREDIT_CONDITION'
export const DELETE_CREDIT_CONDITION = 'DELETE_CREDIT_CONDITION'

export interface InitialState {
  creditConditions: CreditConditionInterface[]
  creditConditionQuery: { [key: string] : string }
}

interface StoreCreditConditions {
  type: typeof STORE_CREDIT_CONDITIONS
  payload: CreditConditionInterface[]
}

interface StoreCreditConditionQuery {
  type: typeof STORE_CREDIT_CONDITION_QUERY
  payload: { [key: string] : string }
}

interface AddCreditCondition {
  type: typeof ADD_CREDIT_CONDITION
  payload: CreditConditionInterface
}

interface UpdateCreditCondition {
  type: typeof UPDATE_CREDIT_CONDITION
  id: string
  payload: CreditConditionUpdateBodyInterface
}

interface DeleteCreditCondition {
  type: typeof DELETE_CREDIT_CONDITION
  payload: string
}

export type CreditConditionActionTypes = StoreCreditConditions | StoreCreditConditionQuery | AddCreditCondition | UpdateCreditCondition | DeleteCreditCondition
