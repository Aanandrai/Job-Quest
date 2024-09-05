import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'

export const UpdateProfileDialog = ({open , setOpen}) => {

    const [loading , setLoading]=useState(false)
    const {user}=useSelector(state=>state.auth)

    const [input ,setInput]=useState({
        fullName:user?.fullName,
        email:user?.email,
        phoneNumber:user?.phoneNumber,
        bio:user?.profile?.bio,
        skills:user?.profile?.skills?.map(skill=>skill),
        file:user?.profile?.resume
    })


  return (
    <div>
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[600px]" onInteractOutside={()=>setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form className="m-auto">
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input 
                                id="name" 
                                className="col-span-3" 
                                value={input.fullName}
                                name="name"
                            />


                        </div>
                    </div>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input 
                                id="email" 
                                className="col-span-3" 
                                value={input.email}
                                name="email"
                            />


                        </div>
                    </div>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="number" className="text-right">Number</Label>
                            <Input 
                                id="number" 
                                className="col-span-3" 
                                value={input.phoneNumber}
                                name="number"/>


                        </div>
                    </div>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Bio</Label>
                            <Input 
                                id="bio" 
                                className="col-span-3" 
                                value={input.bio}
                                name="bio"/>


                        </div>
                    </div>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="skills" className="text-right">Skills</Label>
                            <Input 
                                id="skills" 
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
