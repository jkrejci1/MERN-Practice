import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
//import the context provider to wrap around app
import { WorkoutsContextProvider } from './context/WorkoutContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WorkoutsContextProvider>
        <App /> {/* This is the root, this is what needs to be wrapped in our context provider component */}
    </WorkoutsContextProvider>
  </React.StrictMode>
);