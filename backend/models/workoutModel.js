//The schema for our database docs
const mongoose = require('mongoose')

const Schema = mongoose.Schema

//Our schema document for workouts -> Defines the structure of the Doc
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true }) //Use timestamps -> automatically makes a created stamp for us and when it was last updated (not required)

//Export the Schema to use elseware -> The model
module.exports = mongoose.model('Workout', workoutSchema)
