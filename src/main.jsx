import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CreateTask from './components/CreateTask.jsx';
import UpdateTask from './components/UpdateTask.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "create-task",
    element: <CreateTask></CreateTask>
  },
  {
    path: "update-task",
    element: <UpdateTask></UpdateTask>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
