const User = require('../models/user')
const Blog = require('../models/blog')

const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const initialBlogs = [
    {
        "title": "Living with AI",
        "author": "Jin H. Pang",
        "url": "www.sixseven.com",
        "likes": "67"
    },
    {
        "title": "Not living with AI",
        "author": "Jin H. Pang",
        "url": "www.sixseven.com",
        "likes": "-67"
    }
]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const postUser = async ({ username, name, password }) => {
    const newUser = { username, name, password }

    const result = await api
            .post('/api/users')
            .send(newUser)

    return result
}

module.exports = {
    initialBlogs,
    blogsInDB,
    usersInDB,
    postUser
}