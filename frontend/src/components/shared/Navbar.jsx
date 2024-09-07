import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "../../components/ui/popover"

  import {
    Avatar,
    AvatarImage,
  } from "../../components/ui/avatar"
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'
import { setUser } from "../../redux/authSlice"



export const Navbar = () => {

 
  const {user}=useSelector(state=>state.auth)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const logoutHandler=async()=>{
    await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true})
    .then((res)=>{
        dispatch(setUser(null))
        navigate("/")
        toast.success(res.data.message)
    })
    .catch((err)=>{
      toast.error(error.response?.data.message,{
        className: 'text-sm p-4 shadow-lg !text-white !bg-[#344367] ',
        duration: 3000
    })
    })
  }

  return (
    <>

    <div className="bg-white">
      <div className="flex justify-between items-center px-10 py-5">

          {/* //left part of Navbar */}
          <div>  
              <h1 className="text-2xl font-bold">Job<span className="text-[#F83002]">Quest</span></h1>
          </div>


          {/* Right part of Navbar  */}
          <div className="flex items-center gap-[2.3vw] mr-[6vw]">
            <ul className="flex font-medium items-center gap-[6vw] mr-[3vw] cursor-pointer ">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/Jobs">Jobs</Link></li>
              <li><Link to="/Browse">Browse</Link></li>
            </ul>

            {
              !user? (
                <div className="flex items-center gap-4">
                  <Link to="/login"> <Button className="bg-white hover:bg-gray-50" variant="outline">Login</Button></Link>
                  <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5A2DA9]">Sign up</Button></Link>
                  
                </div>
              ):(
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                        
                    </Avatar>
                  </PopoverTrigger>


                  <PopoverContent className="w-[19vw]">
                    <div className="flex gap-5 ">
                      <Avatar className="cursor-pointer">
                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                          
                      </Avatar>

                      <div>
                        <h1 className="font-medium">{user?.fullName}</h1>
                        <p className="text-sm text-muted-foreground"> {user?.profile?.bio}</p>

                      </div>
                    </div>

                    <div className="cursor-pointer flex w-fit items-center gap-2">
                    <User2/>
                      <Button variant="link"><Link to="/profile"> View profile</Link></Button>
                      
                    </div>

                    <div className="cursor-pointer flex w-fit items-center gap-2">
                      <LogOut/>
                      <Button onClick={logoutHandler} variant="link">Logout</Button>
                    </div>
                    
                  </PopoverContent>
                </Popover>  
              )
            }


          </div>


      </div>

    </div>
    </>
  )
}
