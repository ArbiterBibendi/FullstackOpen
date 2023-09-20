const {favoriteBlog} = require('../utils/list_helper');
const oneBlog = [{likes: 2}];
const multipleBlogs = [{likes: 2}, {likes: 5}];
const emptyArray = [];

describe('favoriteBlog', () => {
  test('one blog', () => {
    expect(favoriteBlog(oneBlog)).toEqual({likes: 2});
  });
  test('multiple blogs', () => {
    expect(favoriteBlog(multipleBlogs)).toEqual({likes: 5});
  });
  test('zero blogs', () => {
    expect(favoriteBlog(emptyArray)).toEqual(null);
  });
});
