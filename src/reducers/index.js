import { SEARCH_TERM, UPDATE_ALL_UNIT_CODES } from '../actions/'

const initialState = {
  query: 'monPlan',
  allUnits: null
}

function unitApp (state = initialState, action) {
  switch (action.type) {
    case SEARCH_TERM:
      console.log(`new search term: ${action.query}`)
      return Object.assign({}, state,
        {
          query: action.query
        }
      )
    case UPDATE_ALL_UNIT_CODES:
      console.log(`updating unit list, now contains ${action.unitCodes.length} items`)
      return Object.assign({}, state,
        {
          allUnitCodes: action.unitCodes
        }
      )
    default:
      return state
  }
}

export default unitApp
