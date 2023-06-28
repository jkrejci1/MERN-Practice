/**
 * Requests:
 * GET -> Gets info from backend/database
 * POST -> Creates new info to put into backend/database
 * DELETE -> Deletes data from backend/database
 * PATCH -> Updates data from the backend/database like updating certain fields
 */

//Entry level to register the app
//Use install dotenv in terminall to import .env variables
require('dotenv').config()

//Require express
const express = require('express')

//Require mongoose for database
const mongoose = require('mongoose')

//Require the routes
const workoutRoutes = require('./routes/workouts')

//Connect to MongoDB RETURNS A PROMISE
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //After we've connected to the database 
        //Listen for requests on port for requests
        app.listen(process.env.PORT, () => {
            console.log("Connected to DB and listening on port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error) //Log any error that happens when trying to connect
    })

//Start up the app and store it in app
const app = express()

//Create middleware to use json to access data in the requests later in routes
app.use(express.json()) //Any request that comes in -> Passes data to requests object to access in request handler

//Register global middleware
app.use((req, res, next) => {
    //Next goes to the next piece of middlware, needs to be invoked when finsihed
    console.log(req.path, req.method) //Shows us the path and the method to log the requests
    next()
})

//Routes (/api/workouts -> Only fire these routes when you come to the first path, can be anything)
app.use('/api/workouts', workoutRoutes) //So when we fire to '/api/workouts' then we need to use those specific routes that will check for the route after the last forward slash from the given requirement -> for any request -> GET POST DELETE ... etc