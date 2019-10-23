import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = null

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return action.data
    case 'LOG_OUT':
      return action.data
    default:
      return state
  }
}

export const loginUser = (credentials = null) => {
  return async dispatch => {
    let user
    const loggedJSONUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedJSONUser) {
      user = JSON.parse(loggedJSONUser)
    }
    if (credentials) {
      user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    }

    if (user) {
      blogService.setToken(user.token)
      console.log('user', user)

      dispatch({
        type: 'LOG_IN',
        data: user
      })
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'LOG_OUT',
      data: initialState
    })
  }
}

export default userReducer
