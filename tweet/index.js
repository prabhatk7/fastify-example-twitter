'use strict'

const {                                     // tweet, getTweets, getUserTweets are imported from './schemas'
  tweet: tweetSchema,
  getTweets: getTweetsSchema,
  getUserTweets: getUserTweetsSchema
} = require('./schemas')

module.exports = async function (fastify, opts) {                //Api function is exported
  // All APIs are under authentication here!
  fastify.addHook('preHandler', fastify.authPreHandler)          // preHandler hook is added for request authentication

  fastify.post('/', { schema: tweetSchema }, addTwitterHandler)        //addTwitterHandler is executed for post request of url '/'
  fastify.get('/', { schema: getTweetsSchema }, getTwitterHandler)      //getTwitterHandler is executed for get request
  fastify.get('/:userIds', { schema: getUserTweetsSchema }, getUserTweetsHandler)    //getUserTweetsHandler is executed for get request of given url
}

module.exports[Symbol.for('plugin-meta')] = {    // decorators for API are exported
  decorators: {
    fastify: [
      'authPreHandler',
      'tweetService'
    ]
  }
}

async function addTwitterHandler (req, reply) {            //addTwitterHandler is defined
  const { text } = req.body                              
  await this.tweetService.addTweet(req.user, text)
  reply.code(204)
}

async function getTwitterHandler (req, reply) {            //getTwitterHandler is defined
  return this.tweetService.fetchTweets([req.user._id])
}

async function getUserTweetsHandler (req, reply) {         //getUserTweetHandler is defined
  const userIds = req.params.userIds.split(',')
  return this.tweetService.fetchTweets(userIds)
}
