import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import { useField } from './hooks'
import { initializedBlogs } from './reducers/blogReducer'
import { loginUser, logoutUser } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'
import NavigationBar from './components/NavigationBar'
import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Login from './components/Login'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import { Container } from 'semantic-ui-react'

const App = props => {
  const { user } = props

  if (user === undefined) {
    props.loginUser()
  }

  // Get initial blogs
  useEffect(() => {
    props.initializedBlogs()
  }, [])

  // Initial log in
  useEffect(() => {
    try {
      props.loginUser()
    } catch (exception) {
      console.log('error logging in', exception)
    }
  }, [])

  if (user === undefined) {
    return null
  }

  const handleLogout = event => {
    event.preventDefault()
    props.logoutUser()
  }

  const userById = id => {
    return props.users.find(user => id === user.info.id)
  }

  const blogById = id => {
    return props.blogs.find(blog => id === blog.id)
  }

  return (
    <Container>
      <Router>
        <div>
          <NavigationBar user={user} handleLogout={handleLogout} />
          <Notification />
          <Route exact path='/' render={() => <Blogs />} />
          <Route exact path='/blogs' render={() => <Redirect to='/' />} />
          <Route
            exact
            path='/blogs/:id'
            render={({ match }) => <Blog blog={blogById(match.params.id)} />}
          />
          <Route
            exact
            path='/users'
            render={() => <Users users={props.users} />}
          />
          <Route
            exact
            path='/users/:id'
            render={({ match }) => <User user={userById(match.params.id)} />}
          />
          <Route path='/login' render={() => <Login />} />
        </div>
      </Router>
    </Container>
  )
}

const groupedByUser = ({ blogs }) => {
  const grouped = _.chain(blogs)
    .groupBy(blog => {
      return blog.user.id
    })
    .map((value, key) => {
      return {
        info: value[0].user,
        blogs: value
      }
    })
    .value()

  return grouped
}

const mapStateToProps = state => {
  return {
    user: state.user,
    users: groupedByUser(state),
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  initializedBlogs,
  loginUser,
  logoutUser,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
