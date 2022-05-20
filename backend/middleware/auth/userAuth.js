const User = require("../../models/user.models")
const jwt = require('jsonwebtoken')



const userAuth = async(req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.SECRETE_KEY)
            console.log(decoded);
            find = await User.findById(decoded.id).select("-password")
            if (find) {
                req.body.user = find._id
                next();
            } else {
                res.status(401).json({ messege: "you aren't autherized" })
            }

        } catch (err) {
            res.status(500).json({ messege: "Error happened" })
        }
    } else {
        res.status(401).json({ messege: "you aren't autherized" })
    }

}

const userPostsAuth = async(req, res, next) => {

    let token = req.headers.authorization.split(" ")[1];
    console.log(req.headers.authorization);
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {

            const decoded = jwt.verify(token, process.env.SECRETE_KEY)
            find = await User.findById(decoded.id).select("-password")
            if (find) {
                req.body.userInfo = find
                next();
            } else {
                req.query.page = 1
                req.pages = 1
                next()
            }

        } catch (err) {

            res.status(500).json({ messege: "Error happened", err })
        }
    } else {
        req.query.page = 1
        req.pages = 1
        next()
    }

}


module.exports = { userAuth, userPostsAuth }