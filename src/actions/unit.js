import {
  UPDATE_CURRENT_UNIT,
  LOAD_PREVIOUS_UNIT,
  CLEAR_CURRENT_UNIT,
  UNIT_DETAILS_REQUEST, UNIT_DETAILS_SUCCESS, UNIT_DETAILS_FAILURE,
  ALL_UNITS_REQUEST, ALL_UNITS_SUCCESS, ALL_UNITS_FAILURE
} from './constants'

import callAPI from './api'

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
      }).catch(
        error => {
          dispatch({
            type: ALL_UNITS_FAILURE,
            error
          })
        }
    )
  }
}

export const updateCurrentUnit = unitCode => ({
  type: UPDATE_CURRENT_UNIT,
  unitCode
})

export const loadPreviousUnit = () => ({
  type: LOAD_PREVIOUS_UNIT
})

export const clearCurrentUnit = () => ({
  type: CLEAR_CURRENT_UNIT
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
      }).catch(
      error => {
        dispatch({
          type: UNIT_DETAILS_FAILURE,
          unitCode,
          error
        })
      }
    )
  }
}

export const fetchUnitDetailsIfNeeded = unitCode => {
  return (dispatch, getState) => {
    const unitDetails = getState().cachedUnits[unitCode]
    if (!unitDetails && (unitCode !== '')) {
      dispatch(fetchUnitDetails(unitCode))
    }
  }
}

export const reloadCurrentUnit = () => {
  return (dispatch, getState) => {
    const currentUnit = getState().unitHistory.currentUnit
    dispatch(fetchUnitDetails(currentUnit))
  }
}
