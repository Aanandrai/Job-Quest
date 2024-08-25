import React ,{useState} from 'react'
import { Navbar } from '../shared/Navbar'
import { Label } from "../ui/label"
import { Input } from '../ui/input'
import { RadioGroup } from "../ui/radio-group"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '../../utils/constant'

import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../redux/authSlice'
import { Loader2 } from 'lucide-react'


export const Login = () => {

    const [input , setInput]=useState({
        
        email:"",
        password:"",
        role:"",
    })

    const {loading}=useSelector(store=>store.auth)
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const changeEventHandler=(e)=>{
        setInput({...input, [e.target.name]:e.target.value})
    }



    const submitHandler=async(e)=>{
        e.preventDefault()
    
        dispatch(setLoading(true))
        await axios.post(`${USER_API_END_POINT}/login`,input,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        })
            .then((res)=>{
                navigate("/")
                toast.success(res.data.message,{
                    className: 'text-sm p-4 shadow-lg animate-bounce!text-gray-900 !bg-blue-100',
                    duration: 3000
                })
            })
            .catch((error)=>{
                toast.error(error.response?.data.message,{
                    className: 'text-sm p-4 shadow-lg !text-white !bg-[#344367] ',
                    duration: 3000
                })
            })
            .finally(()=>{dispatch(setLoading(false))})
            
        
    }


  return (
    <>
        <Navbar/>


        <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
            <h1 className="font-bold text-xl mb-5">Login</h1>

            <div className="my-2">
                <Label>Email</Label>
                <Input 
                type="email"
                name="email"
                onChange={changeEventHandler}
                placeholder="xyz@gmail.com"/>

            </div>


            <div className="my-2">
                <Label>Password</Label>
                <Input 
                type="password"
                name="password"
                onChange={changeEventHandler}
                placeholder="*******"/>

            </div>

            <div className="flex items-center space-x-2 justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
                <div className="flex items-center space-x-2">
                    <Input
                    type="radio"
                    name="role"
                    value="student"
                    id="r1"
                    checked={input.role=="student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"/>
                    <Label htmlFor="r1">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    id="r2"
                    checked={input.role=="recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"/>
                    <Label htmlFor="r2">Recruiter</Label>
                </div>
                
            </RadioGroup>
            
            </div>
            {
                loading?<Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button>:<Button type="submit" className="w-full my-4">Login</Button>
            }
        
            
            <span className="text-sm">Don't have an account? <Link to="/signup" className="text-blue-600">Sign up</Link></span>


        </form>
        </div>
    </>
  )
}
