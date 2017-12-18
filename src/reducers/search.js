import {
  UPDATE_SEARCH_QUERY,
  HIDE_SEARCH_RESULTS, REVEAL_SEARCH_RESULTS,
  REQUEST_SEARCH_RESULTS, RECEIVE_SEARCH_RESULTS
} from '../actions/constants'

const DEFAULT_STATE = {
  query: '',
  results: [],
  areResultsHidden: true
}

const search = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_QUERY:
      return Object.assign({}, state,
        {
          query: action.query
        }
      )
    case HIDE_SEARCH_RESULTS:
      return Object.assign({}, state,
        {
          areResultsHidden: true
        }
      )
    case REVEAL_SEARCH_RESULTS:
      return Object.assign({}, state,
        {
          areResultsHidden: false
        }
      )
    case REQUEST_SEARCH_RESULTS:
      // invalidate the current search, begin loading new results
      return Object.assign({}, state,
        {
          results: []
        }
      )
    case RECEIVE_SEARCH_RESULTS:
      return Object.assign({}, state,
        {
          results: action.items
        }
      )
    default:
      return state
  }
}

export default search
