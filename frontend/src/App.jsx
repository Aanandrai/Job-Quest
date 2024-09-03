
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Login } from './components/auth/Login'
import { Signup } from './components/auth/Signup'
import { Home } from './components/Home/Home'
import {Jobs} from "./components/Jobs/Jobs"
import { Browse } from './components/Browse/Browse'
import { Profile } from './components/profile/profile'
import { JobDescription } from './components/JobDescription/JobDescription'

const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/Jobs",
    element:<Jobs/>
  },

  
  {
      path:"/description/:id",
      element:<JobDescription/>
    },


  {
    path:"/Browse",
    element:<Browse/>
  },
  {
    path:"/profile",
    element:<Profile/>
  },

  //{
    //   path:"/",
    //   element:<Home/>
    // }
])


function App() {


  return (
    <>
      <RouterProvider router={appRouter}/>
      
    </>
  )
}

export default App
