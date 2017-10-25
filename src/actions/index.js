import 'whatwg-fetch'

// SEARCH BAR

export const UPDATE_QUERY = 'UPDATE_QUERY'
export const SEARCH_CHECK = 'SEARCH_CHECK'
export const SEARCH_VALID = 'SEARCH_VALID'
export const SEARCH_INVALID = 'SEARCH_INVALID'

export const updateQuery = query => ({
  type: UPDATE_QUERY,
  query
})

export const searchCheck = () => ({
  type: SEARCH_CHECK
})

export const searchValid = query => ({
  type: SEARCH_VALID,
  query
})

export const searchInvalid = () => ({
  type: SEARCH_INVALID
})

export const searchIfValid = () => {
  return (dispatch, getState) => {
    dispatch(searchCheck())

    const currentState = getState()
    const query = currentState.search.query
    const allUnits = currentState.allUnits.items
    let isValidSearch = false

    // exit if items does not exist
    if (!allUnits) {
      return dispatch(searchInvalid())
    }

    currentState.allUnits.items.forEach(unit => {
      if (query === unit.unitCode) {
        isValidSearch = true
      }
    })

    if (isValidSearch) {
      dispatch(fetchUnitDetails(query))
      dispatch(searchValid(query))
    } else {
      dispatch(searchInvalid())
    }
  }
}

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

// HANDLES INDIVIDUAL UNIT DETAIL REQUESTS
export const UNIT_DETAILS_REQUEST = 'UNIT_DETAILS_REQUEST'
export const UNIT_DETAILS_SUCCESS = 'UNIT_DETAILS_SUCCESS'
export const UNIT_DETAILS_FAILURE = 'UNIT_DETAILS_FAILURE'

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
