const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

describe('when there is initially some notes saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })

    // 4.8
    test('all blogs are returned', async () => {
        const blogs = await helper.blogsInDB()
        assert.strictEqual(helper.initialBlogs.length, blogs.length)
    })

    // 4.9
    test('unique identifier property is named id', async () => {
        const blogs = await helper.blogsInDB()
        blogs.forEach(blog => {
            assert(blog.id)
        })
    })

    // 4.10
    test('blog can be added', async () => {
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
    test('likes defaults to 0 when missing from request', async () => {
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
    test('raise 400 error when title or url properties are missing', async () => {
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

    // 4.13
    test('succeeds with status 204 if id is valid', async () => {
        const blogAtStart = await helper.blogsInDB()
        const blogToDelete = blogAtStart[0]

        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

        const blogAtEnd = await helper.blogsInDB()

        const ids = blogAtEnd.map(n => n.id)
        assert(!ids.includes(blogToDelete.id))

        assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length - 1)
    })

    // 4.14
    test('update number of likes for a blog post', async () => {
        const blogAtStart = await helper.blogsInDB()
        const blogToUpdate = blogAtStart[0]
        const payload = { likes: 99 }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(payload)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogAtEnd = await helper.blogsInDB()
        const updatedBlog = await blogAtEnd.find(b => b.id === blogToUpdate.id)
        assert.strictEqual(updatedBlog.likes, 99)
    })
})

after(async () => {
    await mongoose.connection.close()
})