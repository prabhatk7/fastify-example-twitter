'use strict'

const {                                       //login, registration, search, getProfile are imported from './schemas'
  login: loginSchema,
  registration: registrationSchema,
  search: searchSchema,
  getProfile: getProfileSchema
} = require('./schemas')

const errors = require('../errors')                 //errors is imported from '../errors'

module.exports = async function (fastify, opts) {               //APIs are exported
  // Route registration
  // fastify.<method>(<path>, <schema>, <handler>)
  // schema is used to validate the input and serialize the output

  // Unlogged APIs
  fastify.post('/login', { schema: loginSchema }, loginHandler)                    //post req for login
  fastify.post('/register', { schema: registrationSchema }, registerHandler)       //post req for register

  // Logged APIs
  fastify.register(async function (fastify) {                            //registering APIs
    fastify.addHook('preHandler', fastify.authPreHandler)                //preHandler hook for authentication
    fastify.get('/me', meHandler)
    fastify.get('/:userId', { schema: getProfileSchema }, userHandler)
    fastify.get('/search', { schema: searchSchema }, searchHandler)
  })

  fastify.setErrorHandler(function (error, request, reply) {       //setErrorHandler is set in fastify
    const message = error.message
    if (errors[message]) {
      reply.code(412)
    }
    reply.send(error)
  })
}

// Fastify checks the existance of those decorations before registring `user.js`
module.exports[Symbol.for('plugin-meta')] = {                //decorators exported 
  decorators: {
    fastify: [
      'authPreHandler',
      'userService',
      'jwt',
      'transformStringIntoObjectId'
    ]
  }
}

// In all handlers `this` is the fastify instance
// The fastify instance used for the handler registration

async function loginHandler (req, reply) {                            //loginHandler
  const { username, password } = req.body
  const user = await this.userService.login(username, password)
  return { jwt: this.jwt.sign(user) }
}

async function registerHandler (req, reply) {                          //registrationHandler
  const { username, password } = req.body
  const userId = await this.userService.register(username, password)
  return { userId }
}

async function meHandler (req, reply) {                            //meHandler
  const userId = req.user._id
  return this.userService.getProfile(this.transformStringIntoObjectId(userId))
}

async function userHandler (req, reply) {                       
  return this.userService.getProfile(this.transformStringIntoObjectId(req.params.userId))
}

async function searchHandler (req, reply) {
  const { search } = req.query
  return this.userService.search(search)
}
