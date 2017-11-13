import 'whatwg-fetch'

// handles calls to the monplan API
// does not resolve the call, returns the promise!
const API_ROOT = 'https://monplan-api-dev.appspot.com'
const callAPI = endpoint => {
  const url = `${API_ROOT}/${endpoint}`
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        return Promise.reject(new Error('something went wrong when caling the monPlan API'))
      }
    })
}

// HANDLES SEARCH QUERIES AND THE LOADING OF RESULTS
export const UPDATE_SEARCH_QUERY = 'UPDATE_SEARCH_QUERY'
export const REQUEST_SEARCH_RESULTS = 'REQUEST_SEARCH_RESULTS'
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS'

export const updateSearchQuery = query => ({
  type: UPDATE_SEARCH_QUERY,
  query
})

export const requestSearchResults = () => ({
  type: REQUEST_SEARCH_RESULTS
})

export const receiveSearchResults = (query, items) => ({
  type: RECEIVE_SEARCH_RESULTS,
  query,
  items
})

export const updateSearch = query => {
  return (dispatch, getState) => {
    dispatch(updateSearchQuery(query))
    dispatch(requestSearchResults())

    const currentState = getState()
    const target = query.toLowerCase()
    const allUnits = currentState.allUnits
    let results = []

    // exit if there is not a currently valid list of units
    if (allUnits.didInvalidate || allUnits.isFetching) {
      return dispatch(receiveSearchResults(query, []))
    }

    // query must be at least letters long to give our results some accuracy
    if (target.length < 3) {
      return dispatch(receiveSearchResults(target, []))
    }

    allUnits.items.forEach(unit => {
      if (unit.unitCode.toLowerCase().includes(target) || unit.unitName.toLowerCase().includes(target)) {
        results.push({
          unitCode: unit.unitCode,
          unitName: unit.unitName
        })
      }
    })

    dispatch(receiveSearchResults(query, results))
  }
}

// HANDLES REQUESTS FOR ALL UNITS
export const ALL_UNITS_REQUEST = 'ALL_UNITS_REQUEST'
export const ALL_UNITS_SUCCESS = 'ALL_UNITS_SUCCESS'
export const ALL_UNITS_FAILURE = 'ALL_UNITS_FAILURE'

export const fetchAllUnits = () => {
  return dispatch => {
    dispatch({
      type: ALL_UNITS_REQUEST
    })

    callAPI('basic/units').then(
      response => {
        dispatch({
          type: ALL_UNITS_SUCCESS,
          response
        })
      },
      error => {
        dispatch({
          type: ALL_UNITS_FAILURE,
          error
        })
      }
    )
  }
}

// HANDLES REQUESTS FOR INDIVIDUAL UNITS
export const UPDATE_CURRENT_UNIT = 'UPDATE_CURRENT_UNIT'
export const UNIT_DETAILS_REQUEST = 'UNIT_DETAILS_REQUEST'
export const UNIT_DETAILS_SUCCESS = 'UNIT_DETAILS_SUCCESS'
export const UNIT_DETAILS_FAILURE = 'UNIT_DETAILS_FAILURE'

export const updateCurrentUnit = unitCode => ({
  type: UPDATE_CURRENT_UNIT,
  unitCode
})

export const fetchUnitDetails = unitCode => {
  return dispatch => {
    dispatch({
      type: UNIT_DETAILS_REQUEST,
      unitCode
    })

    callAPI(`units/${unitCode}`).then(
      response => {
        dispatch({
          type: UNIT_DETAILS_SUCCESS,
          unitCode,
          response
        })
      },
      error => {
        dispatch({
          type: UNIT_DETAILS_FAILURE,
          error
        })
      }
    )
  }
}

export const fetchUnitDetailsIfNeeded = unitCode => {
  return (dispatch, getState) => {
    const currentState = getState()
    if (!currentState.cachedUnits[unitCode]) {
      dispatch(fetchUnitDetails(unitCode))
    }
  }
}
