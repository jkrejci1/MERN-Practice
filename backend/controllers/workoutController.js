//The file for the controller of the workout routes

//Import the workout model, and mongoose
const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//Get all workouts
const getWorkouts = async (req, res) => {
    //You can put values in the {} to get specific docs
    const workOuts = await Workout.find({}).sort({createdAt: -1}) //Lists in descending order by newest ones on the top
    res.status(200).json(workOuts)
}

//Get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params //Grabbing the id property from the route on the routes file (:id)

    //Check if we have a valid id, SO IF WE DONT OUR APP DOESN'T CRASH
    if (!mongoose.Types.ObjectId.isValid(id)) {
        //If not valid, return an error message
        return res.status(404).json({error: 'No such workout'})
    }
    const workout = await Workout.findById(id)

    if (!workout) {
        //If the doc doesn't exist, return this error
        return res.status(404).json({error: 'No such workout'})
    }

    //If it exists then we found a workout respond with its json data
    res.status(200).json(workout)
}

//Create a new workout
const createWorkout = async (req, res) => {
    //Use request object to grab properties which was made available from the middleware on the server corresponding to it
    const {title, load, reps} = req.body //Was given to use as json -> Lets extract them

    //Used to detect which fileds are empty when sent a post request for errors possibly
    let emptyFields = []

    //Checks for possible errors
    if(!title) {
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }

    //Check to see if emptyFields is > 0 -> we have errors to send back
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields }) //Send back an error message with the fields needed to fill in
    }

    //Add doc to DB
    //Need to use try catch block when working with data like this back and forth
    try {
        //Creates a workout object with the give requested title, load, reps set to its values corresponding in the schema
        const workout = await Workout.create({title, load, reps}) //This is async need to use await
        res.status(200).json(workout) //Respond with the workout document to log it was made
    } catch(error) {
        console.log("ERROR:", error.message) //WE ARE GETTING THE ERROR OK
        res.status(400).json({error: error.message}) //Respond with error message if it didn't work
    }

}

//Delete a workout
const deleteWorkout = async (req, res) => {
    //Grab the id from the route parameter
    const { id } = req.params

    //Check if we have a valid id, SO IF WE DONT OUR APP DOESN'T CRASH
    if (!mongoose.Types.ObjectId.isValid(id)) {
        //If not valid, return an error message
        return res.status(404).json({error: 'No such workout'})
    }

    //So we have a valid ID, delete the doc by the matching ID
    const workout = await Workout.findOneAndDelete({_id: id})

    //If the workout doesn't exist, don't try to delete it
    if (!workout) {
        //If the doc doesn't exist, return this error
        return res.status(404).json({error: 'No such workout'})
    }

    //If we had a workout it deleted
    res.status(200).json(workout)
}

//Update a workout (patch req sends data like a json object with title and reps properties for example from our schema)
const updateWorkout = async (req, res) => {
    //Grab the id from the route parameter
    const { id } = req.params

    //Check if we have a valid id, SO IF WE DONT OUR APP DOESN'T CRASH
    if (!mongoose.Types.ObjectId.isValid(id)) {
        //If not valid, return an error message
        return res.status(404).json({error: 'No such workout'})
    }

    //Try to update it and pass the find criteria and the object for updates you want to make
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body //Whatever changes are made in the body would update here
    })

    //If the workout doesn't exist, don't try to delete it
    if (!workout) {
        //If the doc doesn't exist, return this error
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

//Export the functions
module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}