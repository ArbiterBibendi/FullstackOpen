const {mostBlogs} = require('../utils/list_helper');
const oneBlog = [{likes: 2, author: 'Mr. Monday'}];
const multipleBlogs = [
  {likes: 2, author: 'Mr. Monday'},
  {likes: 5, author: 'Mr. Tuesday'},
  {likes: 3, author: 'Mr. Monday'},
  {likes: 7, author: 'Mr. Tuesday'},
  {likes: 8, author: 'Mr. Monday'},
];
const emptyArray = [];
describe('mostBlogs', () => {
  test('array with one blog', () => {
    expect(mostBlogs(oneBlog)).toEqual({
      author: 'Mr. Monday',
      blogs: 1,
    });
  });
  test('array with multiple blogs', () => {
    expect(mostBlogs(multipleBlogs)).toEqual({
      author: 'Mr. Monday',
      blogs: 3,
    });
  });
  test('array with zero blogs', () => {
    expect(mostBlogs(emptyArray)).toEqual(null);
  });
});

