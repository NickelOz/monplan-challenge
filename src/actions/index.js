export const SEARCH_TERM = 'SEARCH_TERM'

export const searchTerm = query => {
  return {
    type: SEARCH_TERM,
    query
  }
}
