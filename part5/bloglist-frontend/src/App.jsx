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
    const newBlog = { ...blog, likes: blog.likes + 1 }
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

  const compareFn = (a, b) => {
    return b.likes - a.likes;
  }
  const getSortedBlogComponents = () => {
    const sortedBlogs = blogs.sort(compareFn);
    const sortedBlogComponents = sortedBlogs.map(blog =>
      <Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} handleRemove={handleRemove} />
    );
    return sortedBlogComponents;
  }

  const handleRemove = async (blog) => {
    const confirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (!confirmed) {
      return;
    }
    await blogService.deleteBlog(blog);
    setBlogs(blogs.filter((value) => blog !== value));
  }

  const loggedIn = (
    <>
      <p>
        {user?.name} is logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable showLabel='new blog' hideLabel='cancel'>
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

      {getSortedBlogComponents()}
    </div>
  )
}

export default App