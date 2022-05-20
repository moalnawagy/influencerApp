const router = require('express').Router();
const {
    signIn,
    signUp,
    upgradeToPrem,
    deleteByID,
    getUserPosts,
    searchName,
    searchAge,
    getAllUsers
} = require('../services/user.services')
const reachs = require('../middleware/reaches')
const { validateSignup, validateSignin } = require('../middleware/validation/userValidation');
const adminAuth = require('../middleware/auth/adminAuth');
const { userAuth } = require('../middleware/auth/userAuth');
router.post("/signup", reachs, validateSignup, signUp)
router.post("/signIn", reachs, validateSignin, signIn)
router.patch("/upgradeToPrem", adminAuth, upgradeToPrem)
router.delete("/deleteByID", adminAuth, deleteByID)
router.get("/getUserPosts/:id", reachs, userAuth, getUserPosts)
router.get("/searchName", reachs, userAuth, searchName)
router.get("/searchAge", reachs, userAuth, searchAge)
router.get("/getAllUsers", adminAuth, getAllUsers)






router.get('*', (req, res) => {
    res.json({ message: "This End Point isn't Served" })
});


module.exports = router