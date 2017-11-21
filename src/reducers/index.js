import { combineReducers } from 'redux'
import {
  UPDATE_SEARCH_QUERY, HIDE_SEARCH_RESULTS, REVEAL_SEARCH_RESULTS,
  REQUEST_SEARCH_RESULTS, RECEIVE_SEARCH_RESULTS,
  ALL_UNITS_REQUEST, ALL_UNITS_SUCCESS, ALL_UNITS_FAILURE,
  UPDATE_CURRENT_UNIT, LOAD_PREVIOUS_UNIT, CLEAR_CURRENT_UNIT,
  UNIT_DETAILS_REQUEST, UNIT_DETAILS_SUCCESS, UNIT_DETAILS_FAILURE
 } from '../actions/'

const defaultSearchState = {
  query: '',
  results: [],
  areResultsHidden: true
}

function search (state = defaultSearchState, action) {
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

const defaultAllUnitsState = {
  isFetching: true,
  didInvalidate: true,
  items: []
}

function allUnits (state = defaultAllUnitsState, action) {
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

const defaultUnitDetailsState = {
  isFetching: true,
  didInvalidate: false,
  unitDetails: {}
}

function unitDetails (state = defaultUnitDetailsState, action) {
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

const defaultCachedUnitsState = {}

function cachedUnits (state = defaultCachedUnitsState, action) {
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

const defaultUnitHistoryState = {
  currentUnit: '',
  previousUnits: [],
  hasPreviousUnit: false
}

function unitHistory (state = defaultUnitHistoryState, action) {
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

const root = combineReducers({
  search,
  allUnits,
  cachedUnits,
  unitHistory
})

export default root
