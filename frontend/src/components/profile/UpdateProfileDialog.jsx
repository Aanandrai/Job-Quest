import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../redux/authSlice'
import { toast } from 'sonner'
import axios from 'axios'
import {USER_API_END_POINT} from "../../utils/constant"

export const UpdateProfileDialog = ({open , setOpen}) => {

    const [loading , setLoading]=useState(false)
    const {user}=useSelector(state=>state.auth)
    const dispatch=useDispatch()

    const [input ,setInput]=useState({
        fullName:user?.fullName,
        email:user?.email,
        phoneNumber:user?.phoneNumber,
        bio:user?.profile?.bio,
        skills:user?.profile?.skills?.map(skill=>skill),
        file:user?.profile?.resume,
        
    })

    const changeEventHandler=(e)=>{
        e.preventDefault()
       setInput({...input,[e.target.name]:e.target.value})
    }

    const fileChangeHandler=(e)=>{
        e.preventDefault()
        const file=e.target.files?.[0]
        setInput({...input , file})
    }

    const onSubmitHandler=async(e)=>{
        e.preventDefault();
        const formData=new FormData()
        formData.append("fullName",input.fullName)
        formData.append("email",input.email)
        formData.append("phoneNumber",input.phoneNumber)
        formData.append("bio",input.bio)
        formData.append("skills",input.skills)
        if(input.file){
            formData.append("file",input.file)
        }
        
        setLoading(true)
        await axios.put(`${USER_API_END_POINT}/profile/update`,formData,{
            headers:{
                "Content-Type":"maltipart/form-data"
            },
            withCredentials:true
        })
            .then((res)=>{
                console.log(res.data.data)
                dispatch(setUser(res.data.data))
                toast.success(res.data.message)
            })
            .catch((error)=>{
                console.log(error)
                toast.error(error.response?.data.message)
            })
            .finally(()=>{setLoading(false)})

            setOpen(false)

    }


  return (
    <div>
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[600px]" onInteractOutside={()=>setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form className="m-auto" onSubmit={onSubmitHandler}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input 
                                id="fullName" 
                                className="col-span-3" 
                                onChange={changeEventHandler}
                                value={input.fullName}
                                name="fullName"
                                type="text"
                            />


                        </div>
                    </div>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input 
                                id="email" 
                                className="col-span-3" 
                                onChange={changeEventHandler}
                                value={input.email}
                                name="email"
                                type="email"
                            />


                        </div>
                    </div>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="pnoneNumber" className="text-right">P. Number</Label>
                            <Input 
                                id="phoneNumber" 
                                className="col-span-3" 
                                onChange={changeEventHandler}
                                value={input.phoneNumber}
                                name="phoneNumber"

                                />


                        </div>
                    </div>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Bio</Label>
                            <Input 
                                id="bio" 
                                className="col-span-3" 
                                onChange={changeEventHandler}
                                value={input.bio}
                                name="bio"/>


                        </div>
                    </div>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="skills" className="text-right">Skills</Label>
                            <Input 
                                id="skills" 
                                value={input.skills}
                                onChange={changeEventHandler}
                                className="col-span-3" 
                                name="skills"/>


                        </div>
                    </div>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="file" className="text-right">Resume</Label>
                            <Input
                                id="file" 
                                className="col-span-3" 
                                name="file"
                                type="file"
                                onChange={fileChangeHandler}
                                accept="application/pdf"
                                />


                        </div>
                    </div>

                    <DialogFooter>
                    {
                    loading?<Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button>:<Button type="submit" className="w-full my-4">Update</Button>
                    }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
  )
}
