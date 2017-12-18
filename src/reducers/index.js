import { combineReducers } from 'redux'

import search from './search'
import cachedUnits from './cachedUnits'
import allUnits from './allUnits'
import unitHistory from './unitHistory'

const root = combineReducers({
  search,
  allUnits,
  cachedUnits,
  unitHistory
})

export default root
