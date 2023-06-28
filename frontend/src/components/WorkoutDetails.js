import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

//Date fns for customizing dates
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
    //Get the dispatch to send correct info to the hook if ok
    const { dispatch } = useWorkoutsContext()

    const handleClick = async () => {
        //Function for deleting a workout
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        })
        const json = await response.json() //The doc that was just deleted

        //Make sure res is ok so we know we should be deleting things
        if (response.ok) {
            //dispatch action to update our workout context state
            dispatch({type: 'DELETE_WORKOUT', payload: json}) //Payload then would be what we want to delete
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg)</strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p> {/* Also show the timestamp */}
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span> {/* The word in the span for getting the correct symbol has the be the keyword for the symbol (from our index.html file) */}
        </div>
    )
}

export default WorkoutDetails