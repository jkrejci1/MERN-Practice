//All workout routes go here
const express = require('express')
const router = express.Router()
const {
    createWorkout, 
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

//GET all workouts
router.get('/', getWorkouts)

//GET a single workout (:param -> where the param can change) (so it doesn't have to come in as 'id' maybe it comes in as 12345 for example or 343)
router.get('/:id', getWorkout)

//POST a new workout
router.post('/', createWorkout)

//DELETE a workout (:id being what we want to delete)
router.delete('/:id', deleteWorkout)

//UPDATE (PATCH) a workout
router.patch('/:id', updateWorkout)

//Export router functions to use outisde here
module.exports = router