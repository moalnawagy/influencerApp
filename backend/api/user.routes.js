const router = require('express').Router();
const {
    signIn,
    signUp,
    updateByID,
    deleteByID,
    getUserPosts,
    searchName,
    searchAge,
    getAllUsers
} = require('../services/user.services')
const reachs = require('../middleware/reaches')
const hashingPassword = require('../middleware/passwordHashing');
const { validateSignup, validateSignin } = require('../middleware/validation/userValidation');
const adminAuth = require('../middleware/auth/adminAuth')

router.post("/signup", validateSignup, hashingPassword, signUp)
router.post("/signIn", validateSignin, signIn)
router.patch("/updateByID", updateByID)
router.delete("/deleteByID", deleteByID)
router.get("/getUserPosts", getUserPosts)
router.get("/searchName", searchName)
router.get("/searchAge", searchAge)
router.get("/getAllUsers", reachs, adminAuth, getAllUsers)






router.get('*', (req, res) => {
    res.json({ message: "This End Point isn't Served" })
});


module.exports = router