'use strict'

const follow = {           //follow schema
  schema: {
    body: {
      type: 'object',
      required: [ 'userId' ],
      properties: {
        userId: { type: 'string' }
      },
      additionalProperties: false
    }
  }
}

const unfollow = {            //unfollow schema
  schema: {
    body: {
      type: 'object',
      required: [ 'userId' ],
      properties: {
        userId: { type: 'string' }
      },
      additionalProperties: false
    }
  }
}

const followers = {                        //followers schema
  schema: {
    params: {
      type: 'object',
      required: [ 'userId' ],
      properties: {
        userId: { type: 'string' }
      },
      additionalProperties: false
    },
    response: {
      200: {
        type: 'array',
        items: {
          type: 'string'
        }
      }
    }
  }
}

module.exports = {          //follow, unfollow ans followers exported
  follow,
  unfollow,
  followers
}
