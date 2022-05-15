const User = require('../models/user.models')
const Post = require('../models/post.model')
const bcrypt = require('bcrypt')
const generateToken = require('../utils/generateTokens')



// 1-Sign up
const signUp = async(req, res) => {
    const { first_name, last_name, email, password, age, phone, plane, image } = req.body
    const found = await User.findOne({ email })
    if (found) {
        res.status(406).json({ messege: "Sorry But The Email You Are Trying To Use Already Used" })
    } else {
        try {
            if (plane == "premium") {
                if (image) {
                    creating_user = await User.create({ first_name, last_name, email, password, age, phone, isPremium: true, image })
                } else {
                    creating_user = await User.create({ first_name, last_name, email, password, age, phone, isPremium: true })

                }
            } else {
                if (image) {
                    creating_user = await User.create({ first_name, last_name, email, password, age, phone, image })
                } else {
                    creating_user = await User.create({ first_name, last_name, email, password, age, phone })

                }

            }
            token = generateToken(creating_user._id)
            delete creating_user.password
            res.status(201).json({ messege: "Account Was Created Succefuly", token, isPrem: creating_user.isPremium, userInfo: creating_user })
        } catch (error) {
            res.status(500).json({
                messege: `Error Happend While Creating Acount Please Try Again Later`,
                Error: error
            })

        }



    }
}

// 2-Sign in
const signIn = async(req, res) => {
    const { email, password } = req.body
    const found = await User.findOne({ email })
    if (!found) {
        res.status(401).json({ messege: "Sorry But The Email Or Password You've Enterd Is Incorrect" })
    } else {
        const matched = await bcrypt.compare(password, found.password)

        if (matched) {
            const userInfo = await User.findById(found._id).select(' -password')
            found.token = await generateToken(found._id)
            res.status(202).json({ messege: `Hello ${found.first_name}`, token: found.token, userInfo })
        } else {
            res.status(401).json({ messege: `Sorry But The Email Or Password You've Enterd Is Incorrect` })

        }

    }
}

// 3-UpdateByID
const updateByID = async(req, res) => {
    const { id, first_name } = req.body
    const found = await User.findOne({ _id: id })
    if (!found) {
        res.status(404).json({ messege: "Sorry But The Email You Are Trying To Update not Found" })
    } else {
        User.updateOne({ _id: id }, { first_name }).then((result => {
            res.status(201).json({ messege: "Updated Succefuly" })
        })).catch(err => {
            res.status(500).json({
                messege: `Error Happend While Updating Acount Please Try Again Later`,
                Error: err
            })
        })
    }
}

// 4-DeleteByID
const deleteByID = async(req, res) => {
    const { id } = req.body
    const found = await User.findOne({ _id: id })
    if (!found) {
        res.status(404).json({ messege: "Sorry But The Email You Are Trying To Delete not Found" })
    } else {
        try {
            result = await User.deleteOne({ _id: id }).then(r => {
                Post.deleteMany({ created_by: id }).then(e => {
                    res.status(200).json({ messege: "Deletd Succefuly" })
                })
            })

        } catch (error) {
            res.status(500).json({
                messege: `Error Happend While Deleting Acount Please Try Again Later`,
                Error: err

            })

        }





    }
}

// 5- get all posts 
const getUserPosts = async(req, res) => {
    const { userid } = req.headers
    const limit = 5
    const count = await Post.find({ created_by: userid }).count()
    let page = req.query.page
    if (page == undefined || page <= 0 || page > Math.floor(count / limit)) {
        page = 1
    }

    let Skip = (page - 1) * limit;
    if (count) {
        Post.find({ created_by: userid }).skip(Skip).limit(limit).then(posts => {
            res.status(200).json({ posts, page })

        }).catch(e => {
            res.status(500).json({ message: "Error Happend While Getting Posts Please Try Again Later", e })

        })

    } else {
        res.status(404).json({ message: "Sorry But There Is No Posts For This User Right now" })

    }
}

const searchName = async(req, res) => {
    const { x } = req.query
    try {
        const find = await User.find({ first_name: { $regex: `^${x}.*`, $options: 'i' } }).select(' -password')
        if (!find) {
            res.status(404).json({ messege: "There Is No Account With Such Name" })
        } else {
            res.status(200).json(find)
        }
    } catch (error) {
        res.status(500).json({
            messege: `Error Happend While Finding Acount Please Try Again Later`,
            Error: error
        })
    }
}

const getAllUsers = async(req, res) => {
    try {
        const find = await User.find({ "isAdmin": { $ne: true } }).select(' -password')
        if (!find) {
            res.status(404).json({ messege: "There Is No Users" })
        } else {
            res.status(200).json(find)
        }
    } catch (error) {
        res.status(500).json({
            messege: `Error Happend While Finding Acount Please Try Again Later`,
            Error: error
        })
    }
}




const searchAge = async(req, res) => {
    const { x, y } = req.query
    try {
        const find = await User.find({ age: { $lte: y, $gte: x } }).select(' -password')
        if (!find) {
            res.status(404).json({ messege: "There Is No Account With Such Name" })
        } else {
            res.status(200).json(find)
        }
    } catch (error) {
        res.status(500).json({
            messege: `Error Happend While Finding Acount Please Try Again Later`,
            Error: error
        })
    }
}


module.exports = { signIn, signUp, deleteByID, updateByID, getUserPosts, searchName, searchAge, getAllUsers }