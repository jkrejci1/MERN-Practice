//Where we are gonna make our context provider -> So we can update data on page without refetching evertything
import { createContext, useReducer } from "react";

//Then we need to make a new context and store it in a constant
//We also need to export it to be used later on
export const WorkoutsContext = createContext()

//Lets create the reducer function (state -> previous state value, action passed to dispatch -> has a type and payload)
export const workoutsReducer = (state, action) => {
    //Check action type to see what we want to do with the workout -> remove, update, add, etc -> action type would be different for those changes (so the payload would be the new workout)
    
    //Use a switch statement
    switch (action.type) {
        case 'SET_WORKOUTS': //If we want to set a workout return the payload of all the workouts to add
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                //Returns array where the payload (new workout) will be at teh beginning of an array with everything after it being the other workouts (what ... is used for)
                workouts: [action.payload, ...state.workouts] //Return array of payload and spread of the wokrout state -> all our current workouts
            }
        case 'DELETE_WORKOUT':
            return {
                //w is for all the workouts we have
                workouts: state.workouts.filter((w) => w._id !== action.payload._id) //Fire a function for each workout and return true if we want the workout to stay or false to be removed
            }
        default:
            return state //Return the state unchanged if nothing matches
    }
}

//Then provide that context to our application component tree so our components can access it
//Make context provider component (the children are whatevers inside whatever the component wraps -> (the app component here is being sent as paramter here in this case as children))
export const WorkoutsContextProvider = ({ children }) => {
    //Need the value for provider as a state as its going to change over time when new workouts are added
    //We'll use reducer hook to do this

    //state is val, dispatch is our function to update that state, whats different 
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null /* This is the state value (passed as first param in workoutsReducer) */
    }) //Takes a name and an initial value for useReducer(name, init)

    /*
    //To update the state object we call dispatch function and inside we pass an object as an argument which should have a type property which describes in words the state change we want to make
    //Then the second proerty is the payload which represents data we need to make this change
        //in our case it's an array of workout objects

    //Then code inside dispatch being passed is called its action
    //dispatch({type: 'SET_WORKOUTS', payload: [{}, {}]}) //When called in turn our workoutsReducer will be called and pass the action inside its function to update its state and data
    **/

    return (
        /* This is what needs to wrap any part of our application that needs access to the context */
        /* We can use the useContext hook to specify context we want to use, here we'll use custom hooks for context and then we'll just invoke that hook to use it */
        /* Use spread opp to spread diff props inside the object to provide those */
        <WorkoutsContext.Provider value={{...state, dispatch}}> {/* Whatever value we set this as will have that value available to all of our components */}
            {/* We'll wrap everything so everything has access to it */}
            { children }
        </WorkoutsContext.Provider>
    )
}