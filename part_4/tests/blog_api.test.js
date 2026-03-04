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

// 4.10
test.only('blog can be added', async () => {
    const newBlog = {        
        "title": "Living and not living with AI",
        "author": "Jin H. Pang",
        "url": "www.sixseven.com",
        "likes": "142"
    }
    const blogBefore = await helper.blogsInDB()

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogAfter = await helper.blogsInDB()

    titles = blogAfter.map(blog => blog.title)
    assert(titles.includes("Living and not living with AI"))

    assert.strictEqual(blogAfter.length, blogBefore.length + 1)
})

// 4.11
test.only('likes defaults to 0 when missing from request', async () => {
    const newBlog = {
        title: 'Blog without likes',
        author: 'Test Author',
        url: 'www.test.com',
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
})

// 4.12
test.only('raise 400 error when title or url properties are missing', async () => {
    const newBlog = {
        title: 'Blog without url', 
        author: 'Test Author', 
        likes: 0
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

})

after(async () => {
    await mongoose.connection.close()
})