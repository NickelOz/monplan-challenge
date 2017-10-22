export const SEARCH_TERM = 'SEARCH_TERM'
export const UPDATE_ALL_UNIT_CODES = 'UPDATE_ALL_UNIT_CODES'

export const searchTerm = query => {
  return {
    type: SEARCH_TERM,
    query
  }
}

export const updateAllUnitCodes = unitCodes => {
  return {
    type: UPDATE_ALL_UNIT_CODES,
    unitCodes
  }
}
