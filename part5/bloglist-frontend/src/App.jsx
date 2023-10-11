import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({});

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
  const handleLike = async (blog) => {
    const newBlog = {...blog, likes: blog.likes + 1}
    const response = await blogService.likeBlog(newBlog);
    setBlogs(blogs.map((blog) => blog.id !== newBlog.id ? blog : newBlog));
  }
  const showNotification = (text) => {
    setNotification({ content: text, isError: false });
    setTimeout(() => {
      setNotification({ content: null });
    }, 5000);
  }
  const showNotificationError = (text) => {
    setNotification({ content: text, isError: true });
    setTimeout(() => {
      setNotification({ content: null });
    }, 5000);
  }

  const loggedIn = (
    <>
      <p>
        {user?.name} is logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable showLabel='new blog'>
        <BlogForm user={user} blogs={blogs} setBlogs={setBlogs} showNotification={showNotification} />
      </Togglable>
    </>
  );
  const loggedOut = (
    <LoginForm setUser={setUser} showNotificationError={showNotificationError} />
  );
  return (
    <div>
      <Notification notification={notification} />
      <h2>blogs</h2>
      {user ? loggedIn : loggedOut}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike}/>
      )}
    </div>
  )
}

export default App