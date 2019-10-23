import React from 'react'
import { connect } from 'react-redux'
import CreateNewBlog from './CreateNewBlog'
import BlogList from './BlogList'

const Blogs = ({ user }) => {
  return (
    <div>
      <h2>Blogs</h2>
      {user ? <CreateNewBlog /> : <></>}
      <BlogList />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Blogs)
