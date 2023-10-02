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

export default { getAll, setToken, postBlog }