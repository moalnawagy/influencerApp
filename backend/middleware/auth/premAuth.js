const User = require("../../models/user.models")
const jwt = require('jsonwebtoken')



const premAuth = async(req, res, next) => {

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.SECRETE_KEY)
            find = await userModel.findById(decoded.id).select("-password")
            if (find && find.isPremium == true) {
                req.body.userInfo = find
            }
            next();
        } catch (err) {
            res.status(401).json({ messege: "you aren't autherized" })
        }
    } else {
        res.status(401).json({ messege: "you aren't autherized" })
    }


}

module.exports = premAuth