const {totalLikes} = require('../utils/list_helper');
const oneBlog = [{likes: 2}];
const multipleBlogs = [{likes: 2}, {likes: 5}];
const emptyArray = [];
describe('totalLikes', () => {
  test('array with one blog', () => {
    expect(totalLikes(oneBlog)).toBe(2);
  });
  test('array with multiple blogs', () => {
    expect(totalLikes(multipleBlogs)).toBe(7);
  });
  test('array with zero blogs', () => {
    expect(totalLikes(emptyArray)).toBe(0);
  });
});
