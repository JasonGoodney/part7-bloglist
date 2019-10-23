import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks/index'
import LoginForm from './LoginForm'
import { withRouter } from 'react-router-dom'
import { loginUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

let Login = props => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async event => {
    event.preventDefault()
    console.log('handle login', username, password)
    try {
      const credentials = {
        username: username.value,
        password: password.value
      }
      await props.loginUser(credentials)

      props.setNotification(`Logged in as ${username.value}`)
      username.reset()
      password.reset()
      props.history.push('/')
    } catch (exception) {
      console.log(exception)
      props.setNotification('wrong username or password', true)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <LoginForm
        onSubmit={handleLogin}
        username={username}
        password={password}
      />
    </div>
  )
}

Login = withRouter(Login)

export default connect(
  null,
  { loginUser, setNotification }
)(Login)
