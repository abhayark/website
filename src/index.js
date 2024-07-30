import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Signin from './Pages/Signin';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//To create pages
const router = createBrowserRouter([
  {
    path: "/" ,
    element: <Signin/>, //temp reverse back to App
  },
  {
    path: "/Signin",
    element: <Signin/>,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(        
    <RouterProvider router={router} />
);



reportWebVitals();
