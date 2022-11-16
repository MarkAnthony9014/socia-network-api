const router = require('express').Router();

// import all functions from User controller and link them to the user-controller file
const {
    getAllUsers,
    getUserById,
    createUser,
    editUser,
    destroyUser,
    addFriend,
    destroyFriend
} = require('../../controllers/user-controller');

// routes for get and post requests
router.route('/')
.get(getAllUsers)
.post(createUser);

//routes for requests by id
router.route('/:id')
.get(getUserById)
.put(editUser)
.delete(destroyUser);

//routes for friend tasks
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(destroyFriend);




module.exports = router;