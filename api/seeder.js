const axios = require('axios')
const jwt = require('jsonwebtoken')
const { AUTH_SECRET } = require('./src/CONSTANTS.js')

const testData = require('./testData.json')
const { Category } = require('./src/db.js')

const mockURL = process.env.DB_LOCALHOST3001 || "https://studyrooms-deploy.herokuapp.com";

// axios.defaults.baseURL = process.env. || "http://localhost:3001";

async function createTestData() {
  // MOCKUP USERS
  await axios.post(mockURL + '/users/signup', {
    userName: "john.smith",
    firstName: "John",
    lastName: "Smith",
    email: "john@smith.com",
    password: "123",
    active: true,
    isVerified: true
  })
  await axios.post(mockURL + '/users/signup', {
    userName: "stephen.grider",
    firstName: "Stephen",
    lastName: "Grider",
    email: "stephen@grider.com",
    password: "1234",
    active: true,
    amountDonated: 15.5,
    isPremium: true,
    isVerified: true
  })
  await axios.post(mockURL + '/users/signup', {
    userName: "colt.steele",
    firstName: "Colt",
    lastName: "Steele",
    email: "colt@steele.com",
    password: "12345",
    active: false,
    isVerified: true
  })
  await axios.post(mockURL + '/users/signup', {
    userName: "john.smilga",
    firstName: "John",
    lastName: "Smilga",
    email: "john@smilga.com",
    password: "123456",
    active: true,
    amountDonated: 38.2,
    isPremium: true,
    isVerified: true
  })
  await axios.post(mockURL + '/users/signup', {
    userName: "admin",
    firstName: "admin",
    lastName: "admin",
    email: "admin@test.com",
    password: "admin",
    active: true,
    isAdmin: true,
    isVerified: true
  })

  // creo token para las requests de test
  const testToken = jwt.sign({
    userName: "testUser1",
    firstName: "test1",
    lastName: "user1",
    email: "test1@test.com",
    password: "123",
    active: true
  }, AUTH_SECRET, { expiresIn: '1d' })

  // MOCKUP CATEGORIES
  const categ = [
    'Maths',
    'History',
    'Geography',
    'Chemistry',
    'Biology',
    'Economy',
    'Programming',
    'Philosophy',
    'Languages'
  ]

  categ.forEach(c => {
    Category.create({ category: c })
  })

  // MOCKUP QUESTIONS
  for (let i = 0; i < testData.questions.length; i++) {

    const { userId, title, description, categories } = testData.questions[i]

    await axios.post(mockURL + '/questions', {
      userId, title: "Question " + title + " " + i, description, categories
    }, { headers: { "Authorization": `Bearer ${testToken}` } })
  }

  // MOCKUP ANSWERS
  for (let i = 0; i < testData.answers.length; i++) {

    let { questionId, userId, answer, ratingAverage, ratingCount, voteCount } = testData.answers[i]

    await axios.post(mockURL + '/answers', {
      questionId, userId, answer
    }, { headers: { "Authorization": `Bearer ${testToken}` } })

    const answerId = i + 1;
    for (let j = 0; j < voteCount; j++) {
      await axios.post(mockURL + `/answers/vote/${answerId}`, {
        userId, answerId
      }, { headers: { "Authorization": `Bearer ${testToken}` } })
      userId++;
    }

  }

  //MOCKUP COMMENTS
  for (let i = 0; i < testData.comments.length; i++) {

    const { questionId, userId, comment } = testData.comments[i]

    await axios.post(mockURL + '/comments', {
      questionId, userId, comment
    }, { headers: { "Authorization": `Bearer ${testToken}` } })
  }

  //MOCKUP RATING
  for (let i = 0; i < testData.rating.length; i++) {

    const { questionId, answerId, userId, rating } = testData.rating[i]

    await axios.put(mockURL + `/answers/rating/${answerId}`, {
      questionId, answerId, userId, rating
    }, { headers: { "Authorization": `Bearer ${testToken}` } })
  }

  //MOCKUP VOTING
  for (let i = 0; i < testData.voting.length; i++) {

    const { answerId, userId } = testData.voting[i]

    await axios.post(mockURL + `/answers/vote/${answerId}`, {
      answerId, userId
    }, { headers: { "Authorization": `Bearer ${testToken}` } })
  }
}

module.exports = { createTestData }