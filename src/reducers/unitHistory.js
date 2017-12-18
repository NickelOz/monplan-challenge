import {
  UPDATE_CURRENT_UNIT,
  LOAD_PREVIOUS_UNIT,
  CLEAR_CURRENT_UNIT
} from '../actions/constants'

const DEFAULT_STATE = {
  currentUnit: '',
  previousUnits: [],
  hasPreviousUnit: false
}

const unitHistory = (state = DEFAULT_STATE, action) => {
  let newHistory = state.previousUnits
  switch (action.type) {
    case UPDATE_CURRENT_UNIT:
      if (state.currentUnit !== '') {
        newHistory.push(state.currentUnit)
      }
      return Object.assign({}, state,
        {
          currentUnit: action.unitCode,
          previousUnits: newHistory,
          hasPreviousUnit: (newHistory.length > 0)
        }
      )
    case LOAD_PREVIOUS_UNIT:
      let previousUnit = newHistory.pop()
      return Object.assign({}, state,
        {
          currentUnit: previousUnit,
          previousUnits: newHistory,
          hasPreviousUnit: (newHistory.length > 0)
        }
      )
    case CLEAR_CURRENT_UNIT:
      return Object.assign({}, state,
        {
          currentUnit: '',
          previousUnits: []
        }
      )
    default:
      return state
  }
}

export default unitHistory
