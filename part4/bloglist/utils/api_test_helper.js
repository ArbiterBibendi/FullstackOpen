const initialBlogs = [
  {
    title: 'Test Title 1',
    author: 'Johnny Test',
    url: '569u4etnb3',
    likes: 16785,
  },
  {
    title: 'Test Title 2',
    author: 'Billy Zest',
    url: 'g84jf84ja9',
    likes: 0,
  },
  {
    title: 'Test Title 3',
    author: 'Tommy Rest',
    url: '3kd83kdk39',
    likes: 61,
  },
  {
    title: 'Test Title 4',
    author: 'Jimmy Crest',
    url: '2kd94kf89g',
    likes: 7,
  },
  {
    title: 'Test Title 5',
    author: 'Timmy West',
    url: '2kghdj45b8',
    likes: 7,
  },
];

const newBlog = {
  title: 'Test Title 6',
  author: 'Winny Vest',
  url: 'kk3bdjg558',
  likes: 7,
};
const likelessBlog = {
  title: 'Test Title 6',
  author: 'Winny Vest',
  url: 'kk3bdjg558',
};
const titlelessBlog = {
  author: 'Winny Vest',
  url: 'kk3bdjg558',
};
const urllessBlog = {
  title: 'Test Title 6',
  author: 'Winny Vest',
};
const getAll = async (Model) => {
  return (await Model.find({})).map((model) => model.toJSON());
};

const initalUser = {
  username: 'test',
  passwordHash: 'itdoesntreallymatter',
  name: 'test',
};
const validNewUser = {
  username: 'test1',
  password: 'test',
  name: 'test',
};
const invalidUsers = [
  {
    username: 'te',
    password: 'test',
    name: 'test',
  },
  {
    username: 'test',
    password: 'test',
    name: 'test',
  },
  {
    username: 'test',
    password: 'te',
    name: 'test',
  },
];


module.exports = {
  initialBlogs,
  newBlog,
  likelessBlog,
  titlelessBlog,
  urllessBlog,
  getAll,
  initalUser,
  validNewUser,
  invalidUsers,
};
