import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks/index'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const CreateNewBlog = props => {
  const titleField = useField('text')
  const authorField = useField('text')
  const urlField = useField('text')
  const blogFormRef = React.createRef()

  const addBlog = async event => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: 0
    }

    try {
      props.createBlog(blogObject)
      props.setNotification(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      )
    } catch (e) {
      props.setNotification(`error posting blog: ${e}`)
    }
    titleField.reset()
    authorField.reset()
    urlField.reset()
  }
  return (
    <Togglable buttonLabel='create new' ref={blogFormRef}>
      <div>
        <h2>create new</h2>
        <BlogForm
          onSubmit={addBlog}
          titleField={titleField}
          authorField={authorField}
          urlField={urlField}
        />
      </div>
    </Togglable>
  )
}

export default connect(
  null,
  { createBlog, setNotification }
)(CreateNewBlog)
