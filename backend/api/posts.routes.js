const router = require('express').Router();
const {
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
} = require('../services/post.services')
const { validatePost } = require('../middleware/validation/postvalidation');
const { userAuth, userPostsAuth } = require('../middleware/auth/userAuth');
const addPostAuth = require('../middleware/auth/addPostAuth');
const adminAuth = require('../middleware/auth/adminAuth');
const reachs = require('../middleware/reaches');
router.post("/addPost", addPostAuth, validatePost, addPost)
router.put("/updatePost", adminAuth, validatePost, updatePost)
router.put("/pinPost", adminAuth, PinPost)
router.put("/unpinPost", adminAuth, unPinPost)
router.delete("/deletePost", adminAuth, deletePost)
router.get("/getAllPosts", userPostsAuth, getAllPosts)
router.get("/getPinnedPosts", userAuth, getPinnedPosts)
router.get("/statics", reachs, adminAuth, statics)
router.get("/getPostById/:id", getPostById)
router.get("/getYesterdayPosts", getYesterdayPosts)
router.get("/getTodayPosts", getTodayPosts)
router.post("/AddLike", userAuth, likeApost)
router.post("/removeLike", userAuth, deleteLike)


// router.get("/statics", statics)




router.get('*', (req, res) => {
    res.json({ message: "This End Point isn't Served" })
});



module.exports = router