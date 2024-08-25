
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Login } from './components/auth/Login'
import { Signup } from './components/auth/Signup'
import { Home } from './components/Home/Home'


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
  // {
  //   path:"/",
  //   element:<Home/>
  // },
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
