'use strict'

const timeline = {              // timeline object is created
  timeline: {                   // timeline onject inside timeline object
    body: {                    // body object inside timeline
      type: 'object',           // type parameter set to object
      required: [ ],        // requird is another parameter , empty array
      properties: { },        // properties is empty object 
      additionalProperties: false   // additional properties are set to false
    }
  }
}

module.exports = {       // timeline object is exported
  timeline
}
