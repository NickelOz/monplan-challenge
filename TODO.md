## TODO

#### Searching
  [x] Implement search method through allUnits by unitCode / unitName
  [ ] Extend search capabilities with filtering *(faculty, year, no pre-req?)*

#### Unit Information Display
  [ ] Improve error handling to exit gracefully when monPlan API is inaccessible
  [ ] Handle different display states for unitInformation (mount -> load API call -> success/failure)

#### Code Flow
  [x] Handle API calls through redux-thunk, passing requests and responses as actions
  [x] Shift API calls for individual unit details to occur when the props for the UnitInformation component change *(fetchUnitDetailsIfNeeded)*
  [ ] Implement lifecycle methods to handle state changes and transitions

## GENERAL NOTES

 - Used redux-logger and redux-thunk to handle API requests and trace errors

## THINGS I LEARNED

Do NOT handle external requests (API queries) through components! Pass it up through a middleware. [Thunk](https://github.com/gaearon/redux-thunk) is useful for this, as it is designed to handle async process and dispatch corresponding actions

On the topic of middleware, use it! It's great for handling all the aspects of API requests (calling, handling responses, fail cases), though it is quite a lot to get around at first.

Be careful of where you make calls. For example, I originally made API calls whenever a user selected a result, which could lead to many repeated requests for the same unit. This could be improved by making a single request when a result mounts.

When splitting up reducers, ensure you match the state with this. This is performed automatically on top-level reducers using CombineReducers, but in my case, I was pass an entire copy of the cachedUnits state down individually cached units instead of their respective state.

I would recommend the following examples and resources. This was also my primary reference for design patterns.
 - [Redux Async Example](https://github.com/reactjs/redux/blob/master/examples/async)
 - [Redux 'Real-World' Example](https://github.com/reactjs/redux/blob/master/examples/real-world)
 - [Redux - Async Actions](http://redux.js.org/docs/advanced/AsyncActions.html)
 - [Redux - Middlewares](http://redux.js.org/docs/advanced/Middleware.html)