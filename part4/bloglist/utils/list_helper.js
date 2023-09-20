const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (acc, value) => {
    acc += value.likes;
    return acc;
  };
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const mostLiked = blogs.reduce((acc, blog, index) => {
    return acc?.likes > blog?.likes ? acc : blog;
  }, null);
  return mostLiked;
};

const mostBlogs = (blogs) => {
  let authors = [];
  blogs.forEach((blog) => {
    const author = authors.find((author) => {
      return blog.author === author.author;
    });
    if (author === undefined) {
      authors = [...authors, {author: blog.author, blogs: 1}];
    } else {
      author.blogs++;
    }
  });
  return authors.reduce((acc, author) => {
    return acc?.blogs > author?.blogs ? acc : author;
  }, null);
};
const mostLikes = (blogs) => {
  let authors = [];
  blogs.forEach((blog) => {
    const author = authors.find((author) => {
      return blog.author === author.author;
    });
    if (author === undefined) {
      authors = [...authors, {author: blog.author, likes: blog.likes}];
    } else {
      author.likes += blog.likes;
    }
  });
  return authors.reduce((acc, author) => {
    return acc?.likes > author?.likes ? acc : author;
  }, null);
};

favoriteBlog([{likes: 2}, {likes: 5}]);
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
