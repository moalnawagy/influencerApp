const Post = require('../models/post.model')
const User = require('../models/user.models')
const Reach = require('../models/reach.model')


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

const updatePost = async(req, res) => {
    const userId = req.body.userInfo._id
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
    if (find) {

        res.status(201).json({ posts: find })
    } else {
        res.status(404).json({ message: "Sorry But There Is No Posts Right now" })

    }


}
const getPostById = async(req, res) => {
    const id = req.params.id
    const post = await Post.findOne({ _id: id }).populate('created_by', ' -password ').populate("comments.created_by", { image: 1, first_name: 1 })
    try {

        if (post) {
            res.status(200).json({ post })
        } else {
            res.status(404).json({ message: "Sorry But There Is No Posts With These Information" })


        }

    } catch (error) {
        res.status(500).json({ message: "Error Happend While Deleting Post Please Try Again Later", error })



    }

}




const likeApost = async(req, res) => {
    const { post, user } = req.body
    Post.findById(post).then(async(find) => {
        if (find) {
            let likedBefore = await Post.findOne({ _id: post, likes: { $in: [user] } })
            if (!likedBefore) {
                like = await Post.updateOne({ _id: post }, { $addToSet: { "likes": user }, $inc: { "noOfLikes": 1 } })
                res.status(201).json({ message: "like was Aded Succefully" })
            } else {
                res.status(201).json({ message: "you've liked this before" })
            }
        } else {
            res.status(404).json({ message: "there is no post with this id" })
        }



    }).catch((err) => {
        res.status(500).json({ message: "can't preform the operation" })

    })

}

const deleteLike = async(req, res) => {
    const { postId, user } = req.body
    Post.findById(postId).then(async(find) => {
        if (find) {

            let deleteALike = await Post.updateOne({ _id: postId }, { $inc: { 'noOfLikes': -1 }, $pull: { likes: user.toString() } })
            res.status(200).json({ message: "like was Deleted Succefully" })
        } else {
            res.status(404).json({ message: "there is no post with this id" })

        }




    }).catch((err) => {
        res.status(500).json({ message: "can't preform the operation", err })

    })

}

const AddComment = async(req, res) => {
    const { comment, postId } = req.body
    const user = req.body.user._id
    Post.findById(postId).then(async(post) => {

        if (post) {
            Addingcomment = await Post.updateOne({ _id: postId }, { $addToSet: { "comments": { comment, created_by: user } } })
            res.status(201).json({ message: "like was Aded Succefully" })
        } else {
            res.status(404).json({ message: "there is no posts with this id" })
        }

    }).catch((err) => {
        res.status(500).json({ message: "can't preform the operation", err })

    })

}

const PinPost = async(req, res) => {
    const { id } = req.body // post ID
    const post = await Post.findOne({ _id: id })
    if (post) {
        Post.updateOne({ _id: id }, { isPinned: true }).then(r => {
            res.status(201).json({ messege: "Post Was Pinned Succefuly" })

        }).catch(e => {
            res.status(500).json({ message: "Error Happend While Updating Post Please Try Again Later", e })

        })

    } else {
        res.status(404).json({ message: "Sorry But You Can't Pin Posts" })

    }
}

const unPinPost = async(req, res) => {
    const { id } = req.body // post ID
    const post = await Post.findOne({ _id: id })
    if (post) {
        Post.updateOne({ _id: id }, { isPinned: false }).then(r => {
            res.status(201).json({ messege: "Post Was unPinned Succefuly" })

        }).catch(e => {
            res.status(500).json({ message: "Error Happend While Updating Post Please Try Again Later", e })

        })

    } else {
        res.status(404).json({ message: "Sorry But There is no posts with these information" })

    }
}
const statics = async(req, res) => {
    const todayDate = new Date()
    const yestedayDate = new Date();
    const beforeYestedayDate = new Date();
    beforeYestedayDate.setDate(todayDate.getDate() - 2)
    yestedayDate.setDate(todayDate.getDate() - 1)
        // number of users signed up
    const noOfUsers = await User.find().count()
        // number of posts
    const noOfPosts = await Post.find().count()
        //post with most interaction
    const mostInteraction = await Post.find().sort({ noOfLikes: -1 }).limit(1)
    const noOfAllReachs = await Reach.find().count()
    const noOfTodayReachs = await Reach.find({ createdAt: { "$gt": yestedayDate.toISOString() } }).count()
    const noOfTodayPosts = await Post.find({ createdAt: { "$gt": yestedayDate.toISOString() } }).count()
    const noOfYesterdayPosts = await Post.find({ createdAt: { "$lt": todayDate.toISOString(), "$gt": beforeYestedayDate.toISOString() } }).count()
    res.status(200).json({
        noOfUsers,
        noOfPosts,
        mostInteraction: mostInteraction[0],
        noOfAllReachs,
        noOfTodayReachs,
        noOfTodayPosts,
        noOfYesterdayPosts
    })
}
module.exports = {
    addPost,
    updatePost,
    deletePost,
    getAllPosts,
    getPostById,
    likeApost,
    PinPost,
    deleteLike,
    getPinnedPosts,
    unPinPost,
    statics,
    AddComment
}