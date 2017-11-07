## TODO

 - Implement error handling when the monPlan API is down or cannot be accessed
  - 'Could not retrieve unit information for Monash University, please try again!'
  - 'Could retrieve unit details for 'AAA0001', please try again!'
 - Set conditional displays for unit information
  - before call => waiting on API response => display response / handle failure
 - Improve search method
 - Implement Filtering
 - Fix button sending search request failure

## GENERAL NOTES

 - Used redux-logger and redux-thunk to handle API requests and trace errors

## THINGS I LEARNED

Do NOT handle external requests (API queries) through components! Pass it up through a middleware. [Thunk](https://github.com/gaearon/redux-thunk) is useful for this, as it is designed to handle async process and dispatch corresponding actions

On the topic of middleware, use it! It's great for handling all the aspects of API requests (calling, handling responses, fail cases), though it is quite a lot to get around at first.

I would recommend the following examples and resources. This was also my primary reference for design patterns.
 - [Redux Async Example](https://github.com/reactjs/redux/blob/master/examples/async)
 - [Redux 'Real-World' Example](https://github.com/reactjs/redux/blob/master/examples/real-world)
 - [Redux - Async Actions](http://redux.js.org/docs/advanced/AsyncActions.html)
 - [Redux - Middlewares](http://redux.js.org/docs/advanced/Middleware.html)