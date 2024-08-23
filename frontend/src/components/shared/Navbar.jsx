import React, {useState} from 'react'
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
import { Link } from 'react-router-dom'



export const Navbar = () => {

  
  const user=false

  return (
    <>

    <div className="bg-white">
      <div className="flex justify-between items-center mx-auto max-w-7xl h-16 ml-[3vw] mr-[4vw] ">

          {/* //left part of Navbar */}
          <div>  
              <h1 className="text-2xl font-bold">Job<span className="text-[#F83002]">Quest</span></h1>
          </div>


          {/* Right part of Navbar  */}
          <div className="flex items-center gap-[2.3vw] mr-[6vw]">
            <ul className="flex font-medium items-center gap-[6vw] mr-[3vw] cursor-pointer ">
              <li>Home</li>
              <li>Jobs</li>
              <li>Browse</li>
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
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        
                    </Avatar>
                  </PopoverTrigger>


                  <PopoverContent className="w-[19vw]">
                    <div className="flex gap-5 ">
                      <Avatar className="cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                          
                      </Avatar>

                      <div>
                        <h1 className="font-medium">Aanand rai</h1>
                        <p className="text-sm text-muted-foreground"> Lorem ipsum dolor sit amet consectetur.</p>

                      </div>
                    </div>

                    <div className="cursor-pointer flex w-fit items-center gap-2">
                    <User2/>
                      <Button variant="link"> View profile</Button>
                      
                    </div>

                    <div className="cursor-pointer flex w-fit items-center gap-2">
                      <LogOut/>
                      <Button variant="link">Logout</Button>
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
