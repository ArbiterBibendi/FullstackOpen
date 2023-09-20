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

module.exports = {
  dummy,
  totalLikes,
};
