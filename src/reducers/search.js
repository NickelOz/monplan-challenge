import {
  UPDATE_SEARCH_QUERY,
  REQUEST_SEARCH_RESULTS, RECEIVE_SEARCH_RESULTS
} from '../actions/constants'

const DEFAULT_STATE = {
  query: '',
  results: []
}

const search = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_QUERY:
      return Object.assign({}, state,
        {
          query: action.query
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
