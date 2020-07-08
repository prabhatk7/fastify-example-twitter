'use strict'

function convertUserIdToStringInTweet (t) {               //function to convert no to string
  t.user._id = t.user._id.toString('hex')
  return t
}

class TweetService {                                    //TweetService class is defined
  constructor (tweetCollection) {                       //constructor takes tweetCollection and set it as a parameter
    this.tweetCollection = tweetCollection
  }

  async fetchTweets (userIds) {                            //fetchTweets function is defined
    const tweets = await this.tweetCollection.find({        //tweets with a passed userIds are found and sorted in an array
      'user._id': { $in: userIds }
    }).sort({createdAt: -1}).toArray()
    return tweets.map(convertUserIdToStringInTweet)         //tweets array is mapped with function and new array is returned
  }

  async addTweet (user, text) {                           //addTweet function is defined
    await this.tweetCollection.insertOne({                //new tweet with user, text and date is added
      user,
      text,
      createdAt: new Date()
    })
  }

  async ensureIndexes (db) {                              //function is defined
    await db.command({                                      //db command
      'collMod': this.tweetCollection.collectionName,
      validator: {                                        //valid object to validate type 
        user: { $type: 'object' },
        'user._id': { $type: 'string' },
        'user.username': { $type: 'string' },
        text: { $type: 'string' }
      }
    })
    await this.tweetCollection.createIndex({ 'user._id': 1 })   
  }
}

module.exports = TweetService             //TweetService is exported
