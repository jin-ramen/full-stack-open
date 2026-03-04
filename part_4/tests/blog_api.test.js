const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

// 4.8
test.only('all blogs are returned', async () => {
    const blogs = await helper.blogsInDB()
    assert.strictEqual(helper.initialBlogs.length, blogs.length)
})

// 4.9
test.only('unique identifier property is named id', async () => {
    const blogs = await helper.blogsInDB()
    blogs.forEach(blog => {
        assert(blog.id)
    })
})

after(async () => {
    await mongoose.connection.close()
})