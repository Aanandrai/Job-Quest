import React from 'react'
import { JobCart } from './JobCart'

const randomJobs=[1,2,3,4,5,6,7,8]

export const LatestJobs = () => {
  return (
    <div className="max-w-6xl mx-auto my-20">
        <h1 className="text-3xl font-bold"><span className="text-[#6A38C2]">Latest & Top </span>Job Openings</h1>

        <div className="grid grid-cols-3 gap-4">
        {
            randomJobs.slice(0,6).map((item ,index)=><JobCart/>)

        }
        </div>



       
    </div>
  )
}
