import 'whatwg-fetch'

// handles calls to the monplan API
// does not resolve the call, returns the promise!
const API_ROOT = 'https://monplan-api-dev.appspot.com'
const callAPI = endpoint => {
  const url = `${API_ROOT}/${endpoint}`
  return fetch(url).then(
    response => {
      if (response.ok) {
        return response.json()
      } else {
        return Promise.reject(new Error('something went wrong when calling the monPlan API'))
      }
    })
}

export default callAPI
