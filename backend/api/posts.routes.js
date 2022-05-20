const router = require('express').Router();
const {
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
} = require('../services/post.services')

const { validatePost } = require('../middleware/validation/postvalidation');
const { userAuth, userPostsAuth } = require('../middleware/auth/userAuth');
const addPostAuth = require('../middleware/auth/addPostAuth');
const adminAuth = require('../middleware/auth/adminAuth');
const reachs = require('../middleware/reaches');

router.post("/addPost", reachs, addPostAuth, validatePost, addPost)
router.put("/updatePost", adminAuth, validatePost, updatePost)
router.put("/pinPost", adminAuth, PinPost)
router.put("/unpinPost", adminAuth, unPinPost)
router.put("/addComment", userAuth, AddComment)
router.delete("/deletePost", adminAuth, deletePost)
router.get("/getAllPosts", reachs, userPostsAuth, getAllPosts)
router.get("/getPinnedPosts", reachs, userAuth, getPinnedPosts)
router.get("/statics", adminAuth, statics)
router.get("/getPostById/:id", reachs, getPostById)
router.post("/AddLike", reachs, userAuth, likeApost)
router.post("/removeLike", reachs, userAuth, deleteLike)


// router.get("/statics", statics)




router.get('*', (req, res) => {
    res.json({ message: "This End Point isn't Served" })
});



module.exports = router