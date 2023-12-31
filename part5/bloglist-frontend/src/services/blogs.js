import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;
const config = {}

const setToken = (newToken) => {
  token = newToken;
  config.headers = {
    Authorization: `Bearer ${token}`,
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data;
}

const postBlog = async (blog) => {
  const response = await axios.post(baseUrl, blog, config)
  return response.data;
}

const likeBlog = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  return response.data;
}

const deleteBlog = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config);
  return response.data;
}

export default { getAll, setToken, postBlog, likeBlog, deleteBlog }