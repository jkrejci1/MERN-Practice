//Import the hooks we need
import { useContext } from 'react'
import { WorkoutsContext } from '../context/WorkoutContext'

//So every time we want to use our workouts data, invoke this useWorkoutsContext hook to get that context back
export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext) //This hook returns the value of the WorkoutsContext -> what we passed in provider comp of WorkContxt

    //Check if we are within the scope of the context we're using
    //If its being outisde the component tree, it would return null, so throw an error
    if (!context) {
        throw Error('useWorkoutsContext must be used inside a WorkoutsContextProvider')
    }

    return context
}