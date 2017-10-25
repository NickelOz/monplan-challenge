import { combineReducers } from 'redux'
import {
  UPDATE_QUERY, SEARCH_CHECK, SEARCH_VALID, SEARCH_INVALID,
  ALL_UNITS_REQUEST, ALL_UNITS_SUCCESS, ALL_UNITS_FAILURE,
  UNIT_DETAILS_REQUEST, UNIT_DETAILS_SUCCESS, UNIT_DETAILS_FAILURE
 } from '../actions/'

const defaultSearchState = {
  query: '',
  validQuery: false
}

function search (state = defaultSearchState, action) {
  switch (action.type) {
    case UPDATE_QUERY:
      return Object.assign({}, state,
        {
          query: action.query,
          validQuery: false
        }
      )
    case SEARCH_CHECK:
      // invalidate the current search
      return Object.assign({}, state,
        {
          validQuery: false
        }
      )
    case SEARCH_VALID:
      return Object.assign({}, state,
        {
          validQuery: true,
          currentUnit: action.query
        }
      )
    case SEARCH_INVALID:
      return Object.assign({}, state,
        {
          validQuery: false
        }
      )
    default:
      return state
  }
}

function allUnits (state = {}, action) {
  switch (action.type) {
    case ALL_UNITS_REQUEST:
      return Object.assign({}, state,
        {
          isFetching: true,
          didInvalidate: false
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

function unitDetails (state = {}, action) {
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
      return Object.assign({}, action,
        {
          isFetching: false
        }
      )
    default:
      return state
  }
}

function cachedUnits (state = {}, action) {
  switch (action.type) {
    case UNIT_DETAILS_REQUEST:
    case UNIT_DETAILS_SUCCESS:
    case UNIT_DETAILS_FAILURE:
      return Object.assign({}, state,
        {
          [action.unitCode]: unitDetails(state, action)
        }
      )
    default:
      return state
  }
}

const root = combineReducers({
  search,
  allUnits,
  cachedUnits
})

export default root
