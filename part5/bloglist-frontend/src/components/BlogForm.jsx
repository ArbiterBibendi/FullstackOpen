import { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({ user, blogs, setBlogs, showNotification }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const submitBlog = async (e) => {
        e.preventDefault();
        try {
            const response = await blogService.postBlog({
                title,
                author,
                url,
            });
            response.user = user;
            setBlogs([...blogs, response]);
            showNotification(`a new blog ${title} by ${author} added`);
        } catch(e) {
            console.error(e);
        }
    }

    return (
        <div>
            <h1>create new</h1>
            <form onSubmit={submitBlog}>
                <div>
                    title<input type="text" name="Title" onChange={(e) => setTitle(e.target.value)} value={title} />
                </div>
                <div>
                    author<input type="text" name="Author" onChange={(e) => setAuthor(e.target.value)} value={author} />
                </div>
                <div>
                    url<input type="text" name="Url" onChange={(e) => setUrl(e.target.value)} value={url} />
                </div>
                <div>
                    <button type='submit'>create</button>
                </div>
            </form>
        </div>
    );
}

export default BlogForm;
