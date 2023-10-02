import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);

  useEffect(() => { // get blogs
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => { // get logged in user
    const userJson = window.localStorage.getItem('user');
    if (!userJson) {
      return;
    }
    const user = JSON.parse(userJson);
    setUser(user);
    blogService.setToken(user.token);
  }, [])
  const handleLogout = () => {
    window.localStorage.removeItem('user');
    setUser(null);
  }

  if (!user) {
    return <LoginForm setUser={setUser} />;
  }
  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} is logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <BlogForm user={user} blogs={blogs} setBlogs={setBlogs} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App