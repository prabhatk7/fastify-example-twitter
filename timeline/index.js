'use strict' // run in strict mode

const {                            // import timeline object from schemas.js 
  timeline: timelineSchema
} = require('./schemas')

module.exports = async function (fastify, opts) {         // export API as async
  fastify.addHook('preHandler', fastify.authPreHandler)   // preHandler hook is added to to pass request object through authentication.
  fastify.get('/', timelineSchema, getTimelineHandler)    // execute getTimelineHandler when '/' url is received
}

module.exports[Symbol.for('plugin-meta')] = {      // export an object with decorators
  decorators: {
    fastify: [
      'authPreHandler',
      'timelineService'
    ]
  }
}

async function getTimelineHandler (req, reply) {         // function to handle timeline request     
  return this.timelineService.getTimeline(req.user._id)
}
