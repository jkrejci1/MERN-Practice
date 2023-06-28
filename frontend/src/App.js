import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Pages and components
import Navbar from './components/Navbar';
import Home from './pages/home';

function App() {
  return (
    <div className="App">
      {/* Output browserrouter that surrounds everything that needs to use the routing system */}
      <BrowserRouter>
        {/* We want the navbar outside of pages so its on top of everything but inside of router or we can't use the link component */}
          <Navbar />
          
          <div className="pages"> {/* All of our different pages go inside here, do this to style later on */}
            <Routes>
              {/* Individual route that takes a route and element to render */}
              <Route 
                path="/"
                element={<Home />}
              />
            </Routes>
          </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
