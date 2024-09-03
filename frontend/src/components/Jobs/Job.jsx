import React from 'react'
import { Button } from '../ui/button'
import { Bookmark, BookMarked } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'

export const Job = () => {
    const navigate=useNavigate()
    const jobId=1234567

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200">
        <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-gray-500">2 Day ago</p>
            <Button variant="outline" className="rounded-full" size="icon"><Bookmark/></Button>
        </div>
        <div className="flex items-center gap-2 ">
            <Button className="p-6" variant="outline" size="icon">
                <Avatar>
                    <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"/>
                </Avatar>
            </Button>

            <div>
                <h1 className="font-medium text-lg">Company Name</h1>
                <p className="text-sm text-gray-500">India</p>
            </div>
        </div>

        <div >
            <h1 className="font-bold text-lg my-2">Title</h1>
            <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur df adipisicing elit. Id ipsum perferendis hic distinctio fugit! Beatae doloremque ex pariatur laboriosam minus?</p>
        </div>
        
        <div className="flex items-center mt-3 gap-4">
            <Badge className={'text-blue-700 font-bold'} variant="ghost">12 position</Badge>
            <Badge className={'text-[#F83002] font-bold'} variant="ghost">Part time</Badge>
            <Badge className={'text-[#7209b7] font-bold'} variant="ghost">24LPA</Badge>
        </div>

        <div className="flex items-center gap-4 mt-4">
            <Button onClick={()=>navigate(`/description/${jobId}`)} variant="outline">Details</Button>
            <Button className="bg-[#7109b7] hover:bg-[#5b297d]">Save For Later</Button>
        </div>
    </div>
  )
}
