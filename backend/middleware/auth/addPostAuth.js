const User = require("../../models/user.models")
const jwt = require('jsonwebtoken');
const Post = require("../../models/post.model");
const isAllowedToPost = require("../../helpers/isAllowdTopPost.helper");



const addPostAuth = async(req, res, next) => {

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            console.log(req.headers.authorization);
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.SECRETE_KEY)
            find = await User.findById(decoded.id).select("-password")
            req.body.userInfo = find
            req.body.created_by = find["_id"].toString()
            if (find && find.isAdmin === true) {

                next()
            } else if (find && find.isPremium === true) {
                isAllowed = await isAllowedToPost(find["_id"])
                console.log(isAllowed);
                if (isAllowed) {
                    next()
                } else {
                    res.status(403).json({ meessege: "sorry You can't Add posts any more this month" })
                }

            } else {
                res.status(401).json({ messege: "you aren't autherized" })

            }



        } catch (err) {
            res.status(401).json({ messege: "you aren't autherized" })
        }
    } else {
        res.status(401).json({ messege: "you aren't autherized" })
    }


}

module.exports = addPostAuth
module.exports = addPostAuth