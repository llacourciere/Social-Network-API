const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    createUser, 
    updateUser, 
    deleteUser
} = require('../../controllers/user-controllers');

router.route('/')
    .get(getAllUser)
    .post(createUser);

router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;