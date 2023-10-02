const {mostLikes} = require('../utils/list_helper');
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
    expect(mostLikes(oneBlog)).toEqual({
      author: 'Mr. Monday',
      likes: 2,
    });
  });
  test('array with multiple blogs', () => {
    expect(mostLikes(multipleBlogs)).toEqual({
      author: 'Mr. Monday',
      likes: 13,
    });
  });
  test('array with zero blogs', () => {
    expect(mostLikes(emptyArray)).toEqual(null);
  });
});

