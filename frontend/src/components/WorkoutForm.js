import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {

    //Destrcuture the dispatch from our context to update the form live when adding or updating or deleting workouts
    const { dispatch } = useWorkoutsContext()

    //Need a state for each different props the user is gonna type into form
    //Initial value starts at ''
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null) //Creates state error called with setError, that has initial value of null
    const [emptyFields, setEmptyFields] = useState([]) //For checking empty field errors from backend

    //Function for submitting
    const handleSubmit = async (e) => {
        e.preventDefault() //Prevent from refreshing

        const workout = {title, load, reps}
        
        //Send and post req using the POST route
        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout), //Changes workout to a JSON string to be passed to the POST route
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json() //When we send a POST request if its a success we returned json, so now we'll store that

        //If the response was not ok
        if (!response.ok) {
            //Update the error on the form, update that error state (we then get the empty fields in the json response)
            setError(json.error)
            setEmptyFields(json.emptyFields) //Gets emptyFields set into its state
        }

        if (response.ok) {
            //Reset the form so it doesn't stay forever
            setTitle('')
            setLoad('')
            setReps('')

            //Set error to null and output data to the console
            setError(null)

            //Set emptyFields error array back to an empty array to reset it if we have an error before the valid call
            setEmptyFields([])
            
            console.log('New workout added', json) //Show added data in console to check
        
            //Only need to dispatch to update the page when we succesffuly changed it
            dispatch({type: 'CREATE_WORKOUT', payload: json}) //Payload will be the json for the workout data
        }
    }

    //When user types its gonna update the state
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Excersize Title</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)} //setTitle value is what the user entered
                value={title}
                //So if our class includes title (comes from our backend function to check for errors and which error it would be), set the class name to error, and if not set it to nothing
                //This will add a red boarder using css with error className whenever there is an error for the inputs corresponding data that we are typing in for it
                className={emptyFields.includes('title') ? 'error' : ''} //Evaluate to see if it includes a title and if so apply a class to it
            />

            <label>Load (in kg):</label>
            <input 
                type="number"
                onChange={(e) => setLoad(e.target.value)} //setTitle value is what the user entered
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''} //Evaluate to see if it includes a title and if so apply a class to it
            />

            <label>Reps:</label>
            <input 
                type="number"
                onChange={(e) => setReps(e.target.value)} //setTitle value is what the user entered
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''} //Evaluate to see if it includes a title and if so apply a class to it
            />

            <button>Add Workout</button>
            {/* Show the error if we had one */}
            {error && <div className="error">{error}</div>}  

        </form>

        
    )
}

//Export it
export default WorkoutForm