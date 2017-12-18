import {
  UNIT_DETAILS_REQUEST, UNIT_DETAILS_SUCCESS, UNIT_DETAILS_FAILURE
} from '../actions/constants'

const DEFAULT_UNIT_STATE = {
  isFetching: true,
  didInvalidate: false,
  unitDetails: {}
}

const unitDetails = (state = DEFAULT_UNIT_STATE, action) => {
  switch (action.type) {
    case UNIT_DETAILS_REQUEST:
      return Object.assign({}, state,
        {
          isFetching: true,
          didInvalidate: true
        }
      )
    case UNIT_DETAILS_SUCCESS:
      return Object.assign({}, state,
        {
          isFetching: false,
          didInvalidate: false,
          unitDetails: action.response
        }
      )
    case UNIT_DETAILS_FAILURE:
      return Object.assign({}, state,
        {
          isFetching: false
        }
      )
    default:
      return state
  }
}

const DEFAULT_CACHE_STATE = {}

const cachedUnits = (state = DEFAULT_CACHE_STATE, action) => {
  switch (action.type) {
    case UNIT_DETAILS_REQUEST:
    case UNIT_DETAILS_SUCCESS:
    case UNIT_DETAILS_FAILURE:
      return Object.assign({}, state,
        {
          [action.unitCode]: unitDetails(state[action.unitCode], action)
        }
      )
    default:
      return state
  }
}

export default cachedUnits
