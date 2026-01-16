const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => (sum + blog.likes), 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, current) => ((max.likes > current.likes) ? max : current))
}

const mostBlogs = (blogs) => {
    const groupByAuthor = _.groupBy(blogs, 'author')

    const authorWithCounts = _.map(groupByAuthor, (blogs, author) => (
        {
            author: author,
            blogs: blogs.length
        }
    ))

    return blogs.length === 0
        ? null
        : _.maxBy(authorWithCounts, 'blogs')
}

const mostLikes = (blogs) => {
    const groupByAuthor = _.groupBy(blogs, 'author')

    const authorWithLikes = _.map(groupByAuthor, (blogs, author) => (
        {
            author: author,
            likes: totalLikes(blogs)
        }
    ))

    return blogs.length === 0
        ? null
        : _.maxBy(authorWithLikes, 'likes')
}

module.exports ={
    dummy, 
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}