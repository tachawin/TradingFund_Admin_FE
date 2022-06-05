import { LevelInterface } from 'common/apis/level'
import {
  LevelActionTypes,
  STORE_LEVELS,
  STORE_LEVEL_QUERY,
  ADD_LEVEL,
  UPDATE_LEVEL,
  DELETE_LEVEL
} from 'redux/level/types'

export const storeLevels = (levels: LevelInterface[]): LevelActionTypes => ({
  type: STORE_LEVELS,
  payload: levels,
})

export const storeLevelQuery = (levelQuery: { [key: string]: string }): LevelActionTypes => ({
  type: STORE_LEVEL_QUERY,
  payload: levelQuery,
})

export const addLevel = (level: LevelInterface): LevelActionTypes => ({
  type: ADD_LEVEL,
  payload: level,
})

export const updateLevelById = (levelId: string, level: LevelInterface): LevelActionTypes => ({
  type: UPDATE_LEVEL,
  id: levelId,
  payload: level
})

export const deleteLevelById = (levelId: string): LevelActionTypes => ({
  type: DELETE_LEVEL,
  payload: levelId
})