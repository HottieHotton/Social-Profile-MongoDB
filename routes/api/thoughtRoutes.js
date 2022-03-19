const router = require('express').Router();

const { 
getAllThoughts,
createThought,
getThoughtById,
editThoughtById,
deleteThoughtById,
addReaction,
deleteReaction} = require('../../controllers/thoughts-controller');


router.route('/')
.get(getAllThoughts)

router.route('/:userId')
.post(createThought)

router.route('/:id')
.get(getThoughtById)
.put(editThoughtById)
.delete(deleteThoughtById)

router.route('/:thoughtId/reactions')
.post(addReaction)
.delete(deleteReaction)


module.exports = router;