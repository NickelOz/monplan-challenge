import { combineReducers } from 'redux'
import {
  UPDATE_SEARCH_QUERY,
  REQUEST_SEARCH_RESULTS, RECEIVE_SEARCH_RESULTS,
  ALL_UNITS_REQUEST, ALL_UNITS_SUCCESS, ALL_UNITS_FAILURE,
  UPDATE_CURRENT_UNIT,
  UNIT_DETAILS_REQUEST, UNIT_DETAILS_SUCCESS, UNIT_DETAILS_FAILURE
 } from '../actions/'

const defaultSearchState = {
  query: '',
  results: []
}

function search (state = defaultSearchState, action) {
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

function allUnits (state = {}, action) {
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
          [action.unitCode]: unitDetails(state[action.unitCode], action)
        }
      )
    default:
      return state
  }
}

function currentUnit (state = '', action) {
  switch (action.type) {
    case UPDATE_CURRENT_UNIT:
      return action.unitCode
    default:
      return state
  }
}

const root = combineReducers({
  search,
  allUnits,
  cachedUnits,
  currentUnit
})

export default root
