const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    course(id: Int!): Course
    courses(topic: String): [Course]
    searchString(searchString: String!): [Course]
  },
  type Mutation {
    updateCourseTopic(id:Int!, topic: String!): Course
    addCourse(title: String!, author: String, description: String, url: String, topic: String): Course

  },
  type Course {
    id: Int
    title: String
    author: String
    description: String
    topic: String
    url: String
  }
`);

const coursesData = [
  {
    id: 1,
    title: 'Node',
    author: 'Andrew Mead, Rob Percival',
    description:
      'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
    topic: 'Node.js',
    url: 'https://codingthesmartway.com/courses/nodejs/',
  },
  {
    id: 2,
    title: 'Node.js, Express & MongoDB Dev to Deployment',
    author: 'Brad Traversy',
    description:
      'Learn by example building & deploying real-world Node.js applications from absolute scratch',
    topic: 'Node.js',
    url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/',
  },
  {
    id: 3,
    title: 'JavaScript: Understanding The Weird Parts',
    author: 'Anthony Alicea',
    description:
      'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
    topic: 'JavaScript',
    url: 'https://codingthesmartway.com/courses/understand-javascript/',
  },
];

const getCourse = (args) => {
  const id = args.id;
  return coursesData.filter((course) => course.id === id)[0];
};

const getCourses = (args) => {
  if (args.topic) {
    const topic = args.topic;
    return coursesData.filter((course) => course.topic === topic);
  }

  return coursesData;
};

const getSearchString = (args) => {
  const title = args.searchString;
  return coursesData.filter((course) => course.title.includes(title));
};

const updateCourseTopic = ({ id, topic }) => {
  coursesData.map((course) => {
    if (course.id === id) {
      j;
      course.topic = topic;
      return course;
    }
  });
  return coursesData.filter((course) => course.id === id)[0];
};
const addCourse = (args) => {
  coursesData.push({ ...args, id: coursesData.length });
  return coursesData[coursesData.length - 1];
};

const root = {
  course: getCourse,
  courses: getCourses,
  updateCourseTopic: updateCourseTopic,
  searchString: getSearchString,
  addCourse: addCourse,
};

const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000, () => console.log('Express is running on port 4000'));
