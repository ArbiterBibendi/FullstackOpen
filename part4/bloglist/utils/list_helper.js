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
favoriteBlog([{likes: 2}, {likes: 5}]);
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
