//Use the Link property to create links in navbar
import { Link } from 'react-router-dom'

//Component for the navbar
const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Workout Buddy</h1>
                </Link>
            </div>
        </header>
    )
}

//Export the navbar
export default Navbar