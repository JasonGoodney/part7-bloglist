import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { incrementLikesOf, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Comments from './Comments'
import { Button } from 'semantic-ui-react'

// Temp to get user from localStorage on refresh
import { loginUser } from '../reducers/userReducer'
import { useEffect } from 'react'

const Blog = props => {
  const { blog } = props

  const padding = {
    paddingTop: 10
  }

  useEffect(() => {
    props.loginUser()
  }, [])

  if (blog === undefined || blog.user === undefined) {
    return null
  }

  const like = () => {
    props.incrementLikesOf(blog)
    props.setNotification(`you liked '${blog.title}'`)
  }

  return (
    <div className='blog'>
      <h2>
        {blog.title} {blog.author}
      </h2>

      <div>
        <a href='google.com'>{blog.url}</a>
      </div>
      <div>
        {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}{' '}
        {props.user ? (
          <Button compact size='mini' onClick={like}>
            like
          </Button>
        ) : (
          <></>
        )}
      </div>
      <div>
        added by {blog.user && blog.user.name ? blog.user.name : 'Anonymous'}
      </div>
      {props.user && props.user.username === blog.user.username ? (
        <div>
          <Button negative size='mini' onClick={removeBlog}>
            remove
          </Button>
        </div>
      ) : (
        <></>
      )}
      <div style={padding}>
        <Comments blog={blog} />
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  incrementLikesOf,
  removeBlog,
  setNotification,
  loginUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)
