
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Login } from './components/auth/Login'
import { Signup } from './components/auth/Signup'
import { Home } from './components/Home/Home'
import {Jobs} from "./components/Jobs/Jobs"

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
  // {
  //   path:"/",
  //   element:<Home/>
  // },
  // {
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
