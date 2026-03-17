const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe.only('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    
        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({ username: 'root', name: 'superUser', passwordHash })

        await user.save()

    })

    test('username that is not unique is not added', async () => {
        const userAtStart = await helper.usersInDB()

        const result = await helper.postUser({ username: 'root', name: 'superUser', password: 'secret' })
        
        const userAtEnd = await helper.usersInDB()

        assert.strictEqual(result.status, 400)
        assert(result.body.error.includes('expected root to be unique'))

        assert.strictEqual(userAtEnd.length, userAtStart.length)
    })

    test('username must be at least 3 characters long', async () => {
        const userAtStart = await helper.usersInDB()

        const result = await helper.postUser({ username: 'ro', name: 'superUser', password: 'secret' })
        
        const userAtEnd = await helper.usersInDB()
        
        assert.strictEqual(result.status, 400)
        assert(result.body.error.includes('username must be at least 3 characters long'))

        assert.strictEqual(userAtEnd.length, userAtStart.length)
    })

    test('password must be at least 3 characters long', async () => {
        const userAtStart = await helper.usersInDB()

        const result = await helper.postUser({ username: 'root', name: 'superUser', password: 'se' })
        
        const userAtEnd = await helper.usersInDB()
        
        assert.strictEqual(result.status, 400)
        assert(result.body.error.includes('password must be at least 3 characters long'))

        assert.strictEqual(userAtEnd.length, userAtStart.length)
    })
})

after(async () => {
  await mongoose.connection.close()
})