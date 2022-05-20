const User = require('../models/user.models')
const Post = require('../models/post.model')
const bcrypt = require('bcrypt')
const generateToken = require('../utils/generateTokens')
const { json } = require('express/lib/response')



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
                    creating_user = await User.insertMany({ first_name, last_name, email, password, age, phone, isPremium: true, image })
                } else {
                    creating_user = await User.insertMany({ first_name, last_name, email, password, age, phone, isPremium: true })

                }
            } else {
                if (image) {
                    creating_user = await User.insertMany({ first_name, last_name, email, password, age, phone, image })
                } else {
                    creating_user = await User.insertMany({ first_name, last_name, email, password, age, phone })
                }

            }

            token = generateToken(creating_user[0]._id)

            res.status(201).json({ messege: "Account Was Created Succefuly", token, userInfo: creating_user[0] })
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
    try {
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
    } catch (error) {
        res.status(500).json({ error })


    }
}

const upgradeToPrem = async(req, res) => {
    const { id } = req.body
    const found = await User.findOne({ _id: id })
    if (!found) {
        res.status(404).json({ messege: "Sorry But The Email You Are Trying To Update not Found" })
    } else {
        User.updateOne({ _id: id }, { isPremium: true }).then((result => {
            res.status(201).json({ messege: "Updated Succefuly" })
        })).catch(err => {
            res.status(500).json({
                messege: `Error Happend While Updating Acount Please Try Again Later`,
                Error: err
            })
        })
    }
}

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

const getUserPosts = async(req, res) => {
    const { id } = req.params

    const limit = 5
    console.log(id);
    const user = await User.findById(id)
    const count = await Post.find({ created_by: id }).count()
    let page = req.query.page
    if (page == undefined || page <= 0 || page > Math.floor(count / limit)) {
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
        Post.find({ created_by: id }).skip(Skip).limit(limit).populate('created_by', ' -password').populate("likes", ' -password').then(posts => {
            res.status(200).json({ posts, pages, user })

        }).catch(e => {
            res.status(500).json({ message: "Error Happend While Getting Posts Please Try Again Later", e })

        })

    } else {
        res.status(206).json({ message: "Sorry But There Is No Posts For This User Right now", user, pages: 0 })

    }
}

const searchName = async(req, res) => {
    const { name } = req.query
    try {
        const find = await User.find({ first_name: { $regex: `^${name}.*`, $options: 'i' } }).select(' -password')
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


module.exports = { signIn, signUp, deleteByID, upgradeToPrem, getUserPosts, searchName, searchAge, getAllUsers }