const Post = require("../models/post.model")



const isAllowedToPost = async(userId) => {
    console.log(userId);
    todayDate = new Date()
    todayMonth = todayDate.getMonth() + 1
    todayYear = todayDate.getFullYear()

    findPosts = await Post.find({
        created_by: userId,
        createdAt: {
            $gt: `${todayYear}-${todayMonth}-1`,
            $lt: `${todayYear}-${todayMonth}-31`
        }
    }).count()
    console.log(findPosts);
    return findPosts < 2


}
module.exports = isAllowedToPost