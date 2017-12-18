import {
  UPDATE_SEARCH_QUERY,
  HIDE_SEARCH_RESULTS, REVEAL_SEARCH_RESULTS,
  REQUEST_SEARCH_RESULTS, RECEIVE_SEARCH_RESULTS
} from './constants'

export const updateSearchQuery = query => ({
  type: UPDATE_SEARCH_QUERY,
  query
})

export const hideSearchResults = () => ({
  type: HIDE_SEARCH_RESULTS
})

export const revealSearchResults = () => ({
  type: REVEAL_SEARCH_RESULTS
})

export const requestSearchResults = () => ({
  type: REQUEST_SEARCH_RESULTS
})

export const receiveSearchResults = (query, items) => ({
  type: RECEIVE_SEARCH_RESULTS,
  query,
  items
})

export const revealSearchResultsIfNeeded = () => {
  return (dispatch, getState) => {
    const areResultsHidden = getState().search.areResultsHidden
    if (areResultsHidden) {
      dispatch(revealSearchResults())
    }
  }
}

export const performSearch = query => {
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