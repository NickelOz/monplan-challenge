## TODO

#### Searching
  - [x] Implement search method through allUnits by unitCode / unitName
  - [ ] Extend search capabilities with filtering *(faculty, year, no pre-req?)*
  - [x] Collapse search results when a unit is chosen

#### Unit Information Display
  - [x] Improve error handling to exit gracefully when monPlan API is inaccessible
  - [x] Handle different display states for unitInformation (mount -> load API call -> success/failure)
  - [x] Generate buttons linking relevant units for pre-reqs/prohibitions
  - [ ] Ensure these buttons do not link to expired units (disable/red filter)
  - [ ] Handle missing information (no pre-reqs, no location)
  - [x] Allow for 'back/previous' unit (stack of previous units that updates with each new unit load?)

#### Code Flow
  - [x] Handle API calls through redux-thunk, passing requests and responses as actions
  - [x] Shift API calls for individual unit details to occur when the props for the UnitInformation component change *(fetchUnitDetailsIfNeeded)*
  - [x] Implement lifecycle methods to handle state changes and transitions
  - [x] Configure basic testing for components and redux elements
  - [x] Divide sections for a unit into individual components

#### UI
  - [x] Migrate to Material UI
  - [ ] Develop a complete theme to pass down the the MaterialTheme Provider

## GENERAL NOTES
  - Used prop-types to check props passed down to presentation components (jest wasn't used, but it is certainly a possibility)
  - Used redux-logger and redux-thunk to handle API requests and trace errors in action/reducers
  - Material UI is great for handling layout
  - [Git Flight Rules](https://github.com/k88hudson/git-flight-rules#i-need-to-add-staged-changes-to-the-previous-commit) were also useful at one point, when I didn't stage one particular file for a commit.

## THINGS I LEARNED

Do NOT handle external requests (API queries) through components! Pass it up through a middleware. [Thunk](https://github.com/gaearon/redux-thunk) is useful for this, as it is designed to handle async process and dispatch corresponding actions accordingly.

On the topic of middleware, use it! It's great for handling all the aspects of API requests (calling, handling responses, fail cases), though it is quite a lot to get around at first.

Be careful of where you make calls. For example, I originally made API calls whenever a user selected a result, which could lead to many repeated requests for the same unit. This could be improved by making a single request when a unit mounts, that only requests the information if it is needed.

Material UI, a project which implements the guidelines set out by [Google's Material Design Principles](https://material.io/), is really useful for handling styling by handling presentational components.

## OTHER LINKS

I would recommend the following examples and resources. This was also my primary reference for design patterns.
  - [Redux Async Example](https://github.com/reactjs/redux/blob/master/examples/async)
  - [Redux 'Real-World' Example](https://github.com/reactjs/redux/blob/master/examples/real-world)
  - [Redux - Async Actions](http://redux.js.org/docs/advanced/AsyncActions.html)
  - [Redux - Middlewares](http://redux.js.org/docs/advanced/Middleware.html)
  - [Material UI](http://www.material-ui.com/#/)