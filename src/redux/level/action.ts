import { LevelInterface } from 'common/apis/level'
import {
  LevelActionTypes,
  STORE_LEVELS,
  STORE_LEVEL_QUERY
} from 'redux/level/types'

export const storeLevels = (levels: LevelInterface[]): LevelActionTypes => ({
  type: STORE_LEVELS,
  payload: levels,
})

export const storeLevelQuery = (levelQuery: { [key: string]: string }): LevelActionTypes => ({
  type: STORE_LEVEL_QUERY,
  payload: levelQuery,
})
