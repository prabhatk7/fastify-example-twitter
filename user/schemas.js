'use strict'

const userProfileOutput = {              //userProfileOutput object is created
  type: 'object',
  require: [ '_id', 'username' ],
  properties: {
    _id: { type: 'string' },
    username: { type: 'string' }
  }
}

const registration = {                                     //registration object is created
  // This jsonschema will be used for data validation
  body: {
    type: 'object',
    required: [ 'username', 'password' ],
    properties: {
      username: {
        type: 'string'
      },
      password: {
        type: 'string'
      }
    },
    additionalProperties: false
  },
  response: {
    // The 200 body response is described
    // by the following schema
    200: {
      type: 'object',
      required: [ 'userId' ],
      properties: {
        userId: { type: 'string' }
      },
      additionalProperties: false
    }
  }
}

const login = {                              //login object is created for data validation
  body: {
    type: 'object',
    require: [ 'username', 'password' ],
    properties: {
      username: { type: 'string' },
      password: { type: 'string' }
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      require: [ 'jwt' ],
      properties: {
        jwt: { type: 'string' }
      },
      additionalProperties: false
    }
  }
}

const search = {                              //search schema is created
  querystring: {
    type: 'object',
    require: [ 'search' ],
    properties: {
      search: { type: 'string' }
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'array',
      items: userProfileOutput
    }
  }
}

const getProfile = {                            //getProfile schema is created
  params: {
    type: 'object',
    required: ['userId'],
    properties: {
      userId: {
        type: 'string',
        pattern: '^[0-9a-fA-F]{24}'
      }
    }
  },
  response: {
    200: userProfileOutput
  }
}

module.exports = {                           //all schemas in this file are exported 
  registration,
  login,
  search,
  getProfile
}
