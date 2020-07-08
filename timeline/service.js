'use strict'

class TimelineService {                        //TimelineService class is created
  constructor (followClient, tweetClient) {   // constructor takes two arguments and set two parameters for object
    this.followClient = followClient
    this.tweetClient = tweetClient
  }

  async getTimeline (userId) {                                           //getTimeline function takes userId as arg
    const followerIds = await this.followClient.getFollowing(userId)     //followerIds variable is initialized 
    followerIds.push(userId)                                             //followeIds pudh method is executed
    return this.tweetClient.fetchTweets(followerIds)                    //followeIds is passed to fetchTweets
  }
}

module.exports = TimelineService              //TimelineService class is exported
