const initialState = {}
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export const setNotification = (
  text,
  isError = false,
  durationInSeconds = 5
) => {
  const durationInMilliseconds = durationInSeconds * 1000
  return dispatch => {
    dispatch(createNotification(text, isError))
    setTimeout(() => {
      dispatch(clearNotification())
    }, durationInMilliseconds)
  }
}

const createNotification = (text, isError = false) => {
  return {
    type: 'SET_NOTIFICATION',
    data: { text: text, isError: isError }
  }
}

const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
    data: initialState
  }
}

export default notificationReducer
