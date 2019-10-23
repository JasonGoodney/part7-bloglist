import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'INCREMENT_LIKES': {
      const temp = action.data
      const oldBlog = state.find(blog => blog.id === temp.id)
      const updatedBlog = { ...temp, user: oldBlog.user }
      return state.map(blog =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
    }
    case 'REMOVE_BLOG':
      return state.filter(item => item !== action.data)
    case 'ADD_COMMENT': {
      const temp = action.data
      const oldBlog = state.find(blog => blog.id === temp.id)
      const updatedBlog = { ...temp, user: oldBlog.user }
      return state.map(blog =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
    }
    default:
      return state
  }
}

export const createBlog = blogObject => {
  console.log(blogObject)
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

const updateBlog = (type, id, data, path) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(id, data, path)
    // updatedBlog.user is just the id
    dispatch({
      type,
      data: updatedBlog
    })
  }
}

export const incrementLikesOf = blog => {
  const changedBlog = {
    ...blog,
    likes: blog.likes + 1
  }

  return dispatch => {
    dispatch(updateBlog('INCREMENT_LIKES', blog.id, changedBlog))
  }
}

export const addComment = (blog, commentContent) => {
  const comment = {
    text: commentContent
  }

  return dispatch => {
    dispatch(updateBlog('ADD_COMMENT', blog.id, comment, '/comments/'))
  }
}

export const initializedBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()

    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    const removedBlog = await blogService.remove(blog.id)
    console.log('removed', removedBlog)
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog
    })
  }
}

export default blogReducer
