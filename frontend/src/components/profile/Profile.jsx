import React, { useState } from 'react'
import { Navbar } from '../shared/Navbar'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Label } from '../ui/label'
import { AppliedJobTable } from './AppliedJobTable'
import { UpdateProfileDialog } from './UpdateProfileDialog'
import { useSelector } from 'react-redux'



const isResume=true

export const Profile = () => {

    const [open, setOpen]=useState(false)
    const {user}=useSelector(state=>state.auth)
   

  return (
    <div>
        <Navbar/>
        <div className="max-w-4xl mx-auto bg-whilte border border-gray-200 rounded-2xl my-5 p-8">

            <div className="flex justify-between">
                <div className="flex items-center gap-4">

                    <Avatar className="h-24 w-24">
                        <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="user profile pic"/>
                    </Avatar>

                    <div>

                        <h1 className="font-medium text-xl">{user?.fullName}</h1>
                        <p>{user?.profile.bio}</p>
                    </div>

                </div>
                <Button onClick={()=>setOpen(true)} className="text-right" variant="outline"><Pen/></Button>

            </div>


            <div className="my-5">
                <div className="flex items-center gap-3">
                    <Mail/>
                    <span>{user?.email}</span>

                </div>

                <div className="flex items-center gap-3 my-2">
                    
                    <Contact/>
                    <span>{user?.phoneNumber}</span>

                </div>
            </div>


            <div className="my-5">
                <h1>Skills</h1>
                <div className="flex items-center gap-1 my-2">

                {
                    user?.profile?.skills.length!=0 ? user?.profile?.skills.map((item,index)=>(<Badge key={index} className="text-sm py-[10px] "> {item}</Badge>)):(<span>Na</span>)
                    
                }

                </div>
            </div>


            <div className="grid w-full max-w-sm items-center gap-1.5">
            
                <Label className="text-md font-bold">Resume</Label>
                
                {
                    isResume? <a target="_blank" href={`${user?.profile?.resume}`} className="text-blue-500 w-full hover:underline cursor-pointer text-sm">{user?.profile?.resumeOriginalName} </a>:<span>Na</span>
                }

            </div>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl mt-5">

            <h1 className="font-bold text-lg my-2">Applied Jobs</h1>

            <AppliedJobTable/>

        </div>

        <UpdateProfileDialog open={open} setOpen={setOpen}/>

    </div> 
  )
}
