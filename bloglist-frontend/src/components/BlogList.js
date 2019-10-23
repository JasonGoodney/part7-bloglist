import React, { useState } from 'react'
import { connect } from 'react-redux'
import Sort from './Sort'
import { incrementLikesOf, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

const BlogList = props => {
  const [sort, setSort] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div>
      {/* <button onClick={() => setSort(!sort)}>
        {sort ? 'sort by default' : 'sort by likes'}
      </button> */}
      <Sort by={sort}>
        {props.blogs.map(blog => (
          <div key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
      </Sort>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = { incrementLikesOf, removeBlog, setNotification }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList)
