import { CreditConditionInterface } from 'common/apis/creditCondition'
import {
  CreditConditionActionTypes,
  STORE_CREDIT_CONDITIONS,
  STORE_CREDIT_CONDITION_QUERY,
  ADD_CREDIT_CONDITION,
  UPDATE_CREDIT_CONDITION,
  DELETE_CREDIT_CONDITION
} from 'redux/creditCondition/types'

export const storeCreditConditions = (creditConditions: CreditConditionInterface[]): CreditConditionActionTypes => ({
  type: STORE_CREDIT_CONDITIONS,
  payload: creditConditions,
})

export const storeCreditConditionQuery = (creditConditionQuery: { [key: string]: string }): CreditConditionActionTypes => ({
  type: STORE_CREDIT_CONDITION_QUERY,
  payload: creditConditionQuery,
})

export const addCreditCondition = (creditCondition: CreditConditionInterface): CreditConditionActionTypes => ({
  type: ADD_CREDIT_CONDITION,
  payload: creditCondition,
})

export const updateCreditConditionById = (conditionId: string, creditCondition: CreditConditionInterface): CreditConditionActionTypes => ({
  type: UPDATE_CREDIT_CONDITION,
  id: conditionId,
  payload: creditCondition
})

export const deleteCreditConditionById = (conditionId: string): CreditConditionActionTypes => ({
  type: DELETE_CREDIT_CONDITION,
  payload: conditionId
})