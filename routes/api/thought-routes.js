const router = require('express').Router();


const {
    getAllThoughts,
    getSingleThought,
    createThought,
    editThought,
    destroyThought,
} = require('../../controllers/thought-controller');



router.route('/')
.get(getAllThoughts)
.post(createThought);


router.route('/:id')
.get(getSingleThought)
.put(editThought)
.delete(destroyThought);




module.exports = router;