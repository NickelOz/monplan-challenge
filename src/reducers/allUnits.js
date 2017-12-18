import {
  ALL_UNITS_REQUEST, ALL_UNITS_SUCCESS, ALL_UNITS_FAILURE
} from '../actions/constants'

const DEFAULT_STATE = {
  isFetching: true,
  didInvalidate: true,
  items: []
}

const allUnits = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ALL_UNITS_REQUEST:
      return Object.assign({}, state,
        {
          isFetching: true,
          didInvalidate: true
        }
      )
    case ALL_UNITS_SUCCESS:
      return Object.assign({}, state,
        {
          isFetching: false,
          didInvalidate: false,
          items: action.response
        }
      )
    case ALL_UNITS_FAILURE:
      return Object.assign({}, state,
        {
          isFetching: false
        }
      )
    default:
      return state
  }
}

export default allUnits
