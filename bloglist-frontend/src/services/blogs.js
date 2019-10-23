import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const request = await axios.post(baseUrl, newObject, config)
  return request.data
}

// const update = async (newObject, path) => {
//   debugger
//   const config = {
//     headers: { Authorization: token }
//   }
//   const request = await axios.put(
//     path ? `${baseUrl}/${newObject.id}/${path}` : `${baseUrl}/${newObject.id}`,
//     newObject,
//     config
//   )
//   debugger
//   return request.data
// }

const update = async (id, data, path) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = await axios.put(
    path ? `${baseUrl}/${id}/${path}` : `${baseUrl}/${id}`,
    data,
    config
  )
  return request.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  console.log(response)
  return response
}

export default { getAll, create, update, remove, setToken }
