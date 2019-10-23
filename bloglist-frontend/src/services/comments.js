import axios from 'axios'

const baseUrl = id => `/api/blogs/${id}/comments`

const getAllForBlog = blogId => {
  const request = axios.get(baseUrl(blogId))
  return request.then(response => response.data)
}

const create = async (blogId, newObject) => {
  const request = await axios.post(baseUrl(blogId), newObject)
  return request.data
}

export default { getAllForBlog, create }
