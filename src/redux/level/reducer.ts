import {
  InitialState,
  LevelActionTypes,
  STORE_LEVELS,
  STORE_LEVEL_QUERY
} from 'redux/level/types'

const INITIAL_STATE: InitialState = {
  levels: [],
  levelQuery: {
    keyword: '',
    startCreated: '',
    endCreated: '',
    startUpdated: '',
    endUpdated: '',
    minCredit: '',
    maxCredit: ''
  },
}

const levelReducer = (state = INITIAL_STATE, action: LevelActionTypes): InitialState => {
  switch (action.type) {
    case STORE_LEVELS:
      return {
        ...state,
        levels: action.payload
      }
    case STORE_LEVEL_QUERY:
      return {
        ...state,
        levelQuery: action.payload
      }
    default:
      return state
  }
}

export default levelReducer
