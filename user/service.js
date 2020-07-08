'use strict'

const DUPLICATE_KEY_ERROR_CODE = 11000        

const errors = require('../errors')                 //errors is imported from '../errors'   

class UserService {                                //UserService object is created
  constructor (userCollection) {
    this.userCollection = userCollection
  }

  async register (username, password) {           //register method is written
    let writeResult
    try {                                         //try to execute insert user in userCollection
      writeResult = await this.userCollection.insertOne({ username, password })
    } catch (e) {                                     //catch the error
      if (e.code === DUPLICATE_KEY_ERROR_CODE) {
        throw new Error(errors.USERNAME_IS_NOT_AVAILABLE)        //throw new error if e.code is 11000
      }
      throw e                                               //else throw the same error
    }

    return writeResult.insertedId                 //if no error, return insertedId
  }

  async login (username, password) {                     //login method is written
    const users = await this.userCollection.find({ username, password }, { projection: {password: 0} }).toArray()
    const user = users[0]

    if (!user) throw new Error(errors.WRONG_CREDENTIAL)

    return user          //return user
  }

  getProfile (_id) {                              //getProfile method
    return this.userCollection.findOne({ _id }, { projection: {password: 0} })
  }

  async search (searchString) {                //search method
    const query = {
      username: { $regex: searchString }
    }
    const users = await this.userCollection.find(query, { projection: {password: 0} }).limit(5).toArray()
    return users
  }

  async ensureIndexes (db) {                          //ensureIndexes method 
    await db.command({
      'collMod': this.userCollection.collectionName,
      validator: {
        username: { $type: 'string' },
        password: { $type: 'string' }
      }
    })
    await this.userCollection.createIndex({ username: 1 }, { unique: true })
  }
}

module.exports = UserService              //userService exported
