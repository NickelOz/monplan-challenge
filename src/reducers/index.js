import { SEARCH_TERM } from '../actions/'

const initialState = {
  query: 'monPlan'
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
    default:
      return state
  }
}

export default unitApp
