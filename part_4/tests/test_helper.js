const Blog = require('../models/blog')

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

module.exports = {
    initialBlogs,
    blogsInDB
}