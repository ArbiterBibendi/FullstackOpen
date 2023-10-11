import Togglable from "./Togglable"

const Blog = ({ blog, handleLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable showLabel='show' hideLabel='hide'>
        <p>{blog.url}</p>
        <div>
          {`likes ${blog.likes} `}
          <button onClick={() => handleLike(blog)} >like</button>
        </div>
        <p>{blog.user.name}</p>
      </Togglable>
    </div>
  )
}

export default Blog