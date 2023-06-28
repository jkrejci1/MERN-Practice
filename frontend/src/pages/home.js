import { useEffect } from "react"

//Components

//Import workout details to output full workout details
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

//Create blank react component for home page
const Home = () => {
    //Invoke our useWorkoutsContext hook and destructure the workouts(null to begin with but once we fetch the workers we update that using the dispatch function) and dispatch
     const {workouts, dispatch} = useWorkoutsContext()

    //Get data for the workouts using the useEffect hook
    useEffect(() => {

        
        //Fetch the workouts from the backend api
        const fetchWorkouts = async () => {
            //Need to use the port of our backend server
            const response = await fetch('/api/workouts')
        
            const json = await response.json() //Makes response json so we can use it

            //If there's no errors perform whats in here
            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json}) //Then dispatch if we have a valid response passing the set workouts and setting the payload to json as that's the workout data
            }
        }

        fetchWorkouts()
    }, [dispatch]) //Use dependency array to cause this to only fire once

    return (
        <div className="home">
            <div className="workouts">
                {/* Only cycle through the workouts when we have some */}
                {/* So the mapping only happens if workouts is true so it has values or not */}
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout}/> //Pass workout data to the WorkoutDetails component
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

//Export the component
export default Home