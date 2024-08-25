
import React from 'react'
import { Badge } from '../ui/badge'

export const JobCart = () => {
  return (
    <div>

        <div>
            <h1>Company Name</h1>
            <p>India</p>
        </div>

        <div>
            <h1>Job Title</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
        </div>

        <div>
            <Badge className={'text-blue-700 font-bold'} variant="ghost">12 position</Badge>
            <Badge className={'text-blue-700 font-bold'} variant="ghost">12 position</Badge>
            <Badge className={'text-blue-700 font-bold'} variant="ghost">12 position</Badge>
        </div>
       
    </div>
  )
}
