const Post = require('../models/post.model')
const User = require('../models/user.models')
const Like = require('../models/reach.model')

// 1- add post

const addPost = async(req, res) => {
    const { title, created_by, desc } = req.body
    const post = await Post.findOne({ title, created_by, desc })
    if (post) {
        res.status(406).json({ messege: "Sorry But You've Posted This Before" })
    } else {
        Post.create({ title, created_by, desc }).then(r => {
            res.status(201).json({ messege: "Post Was Aded Succefuly", post: r })

        })

    }
}

// 2- update post
const updatePost = async(req, res) => {
    const userId = req.headers.userid
    const { id, title, desc } = req.body
    const post = await Post.findOne({ _id: id })
    if (post.created_by.toString() == userId) {
        Post.updateOne({ _id: id }, { title, desc }).then(r => {
            res.status(201).json({ messege: "Post Was Updated Succefuly" })

        }).catch(e => {
            res.status(500).json({ message: "Error Happend While Updating Post Please Try Again Later", e })

        })

    } else {
        res.status(401).json({ message: "Sorry But You Can Only Update Your Posts" })

    }
}

// 3- delete post
const deletePost = async(req, res) => {
    const { id } = req.body
    const post = await Post.findById(id)

    if (post) {
        Post.deleteOne({ _id: id }).then(r => {
            res.status(200).json({ messege: "Post Was Deleted Succefuly" })

        }).catch(e => {
            res.status(500).json({ message: "Error Happend While Deleting Post Please Try Again Later", e })

        })

    } else {
        res.status(404).json({ message: "Sorry But There Is No Post With This Information To Delete" })

    }


}

// 4- get all posts 
const getAllPosts = async(req, res) => {
    const count = await Post.find().count()
    const limit = 5
    let page = req.query.page
    if (page == undefined || page <= 0 || page > Math.ceil(count / limit)) {
        page = 1
    }
    let Skip = (page - 1) * limit;
    if (count) {
        let pages
        if (req.pages != 1) {
            pages = Math.ceil(count / limit)
        } else {
            pages = 1
        }

        posts = await Post.find().skip(Skip).limit(limit).populate('created_by', ' -password').populate("likes", ' -password')
        res.status(201).json({ posts, pages })
    } else {
        res.status(404).json({ message: "Sorry But There Is No Posts Right now" })

    }


}

const getPinnedPosts = async(req, res) => {
        const find = await Post.find({ isPinned: true })
        console.log(find);
        if (find) {

            res.status(201).json({ posts: find })
        } else {
            res.status(404).json({ message: "Sorry But There Is No Posts Right now" })

        }


    }
    // 5- get post by id (with the information of the creator)
const getPostById = async(req, res) => {
    const id = req.params.id
    const { userid } = req.headers
    const post = await Post.findOne({ _id: id }).populate('created_by', ' -password ')
    try {

        if (post) {
            if (post.created_by['_id'].toString() == userid) {
                res.status(200).json({ post })

            } else {
                res.status(401).json({ message: "You Can Get Your Posts Only" })

            }


        } else {
            res.status(404).json({ message: "Sorry But There Is No Posts With These Information" })


        }

    } catch (error) {
        res.status(500).json({ message: "Error Happend While Deleting Post Please Try Again Later", error })



    }

}

// 6- get all posts of yesterday
const getYesterdayPosts = async(req, res) => {
    const todayDate = new Date()
    const beforeYestedayDate = new Date();
    beforeYestedayDate.setDate(todayDate.getDate() - 2)
    const count = await Post.find({ createdAt: { "$lt": todayDate.toISOString(), "$gt": beforeYestedayDate.toISOString() } }).count()
    const limit = 5
    let page = req.query.page
    if (page == undefined || page <= 0 || page > Math.floor(count / limit)) {
        page = 1
    }
    let Skip = (page - 1) * limit;
    if (count) {
        posts = await Post.find({ createdAt: { "$lt": todayDate.toISOString(), "$gt": beforeYestedayDate.toISOString() } }).skip(Skip).limit(limit).populate('created_by', ' -password -_id')
        res.status(201).json(posts)
    } else {
        res.status(404).json({ message: "Sorry But There Is No Posts Right now" })

    }

}

// 7- get all posts of today
const getTodayPosts = async(req, res) => {
    const todayDate = new Date()
    const yestedayDate = new Date();
    yestedayDate.setDate(todayDate.getDate() - 1)
    const count = await Post.find({ createdAt: { "$gt": yestedayDate.toISOString() } }).count()
    const limit = 5
    let page = req.query.page
    if (page == undefined || page <= 0 || page > Math.floor(count / limit)) {
        page = 1
    }
    let Skip = (page - 1) * limit;
    if (count) {
        posts = await Post.find({ createdAt: { "$gt": yestedayDate.toISOString() } }).skip(Skip).limit(limit).populate('created_by', ' -password -_id')
        res.status(201).json(posts)
    } else {
        res.status(404).json({ message: "Sorry But There Is No Posts Right now" })

    }

}

const likeApost = async(req, res) => {
    const { post, user } = req.body
    Post.findById(post).then(async(post) => {

        let likedBefore = await Post.findOne({ _id: post, likes: { $in: [user] } })
        if (!likedBefore) {
            like = await Post.updateOne({ _id: post }, { $addToSet: { "likes": user }, $inc: { "noOfLikes": 1 } })
            res.status(201).json({ message: "like was Aded Succefully" })
        } else {
            res.status(201).json({ message: "you've liked this before" })
        }

    }).catch((err) => {
        res.status(500).json({ message: "can't preform the operation" })

    })

}

const deleteLike = async(req, res) => {
    const { postId, user } = req.body
    Post.findById(postId).then(async(post) => {


        let deleteALike = await Post.updateOne({ _id: postId }, { $inc: { 'noOfLikes': -1 }, $pull: { likes: user.toString() } })
        res.status(201).json({ message: "like was Deleted Succefully" })


    }).catch((err) => {
        res.status(500).json({ message: "can't preform the operation", err })

    })

}

const PinPost = async(req, res) => {
    const { id } = req.body // post ID
    console.log(id);
    const post = await Post.findOne({ _id: id })
    if (post) {
        Post.updateOne({ _id: id }, { isPinned: true }).then(r => {
            res.status(201).json({ messege: "Post Was Pinned Succefuly" })

        }).catch(e => {
            res.status(500).json({ message: "Error Happend While Updating Post Please Try Again Later", e })

        })

    } else {
        res.status(401).json({ message: "Sorry But You Can't Pin Posts" })

    }
}

const unPinPost = async(req, res) => {
    const { id } = req.body // post ID
    console.log(id);
    const post = await Post.findOne({ _id: id })
    if (post) {
        Post.updateOne({ _id: id }, { isPinned: false }).then(r => {
            res.status(201).json({ messege: "Post Was unPinned Succefuly" })

        }).catch(e => {
            res.status(500).json({ message: "Error Happend While Updating Post Please Try Again Later", e })

        })

    } else {
        res.status(401).json({ message: "Sorry But There is no posts with these information" })

    }
}
const statics = async(req, res) => {
    // number of users signed up
    const noOfUsers = await User.find().count()
        // number of posts
    const noOfPosts = await Post.find().count()
        //post with most interaction
    const mostInteraction = await Post.find().sort({ noOfLikes: -1 }).limit(1)
    console.log(mostInteraction[0]);
    res.json({ noOfUsers, noOfPosts, mostInteraction: mostInteraction[0] })
}
module.exports = {
    addPost,
    updatePost,
    deletePost,
    getAllPosts,
    getPostById,
    getYesterdayPosts,
    getTodayPosts,
    likeApost,
    PinPost,
    deleteLike,
    getPinnedPosts,
    unPinPost,
    statics
}