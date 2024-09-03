import React from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'

const filterData=[
  {
    filterType:"Location",
    array:["Delhi" , "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType:"Industry",
    array:["Frontend Developer", "Backend Developer", "FullStack Developer", "Python Developer", "BlockChain Developer"]
  },
  {
    filterType:"Salary",
    array:["0-40k", "4k-1lakh", "1Lakh above"]
  }
]

export const FilterCard = () => {
  return (
    <div className="w-full bg-white rounded-md">
    <h1 className="font-bold text-lg">Filter Jobs</h1>
    <hr className="mt-3"/>
    <RadioGroup>
    {
      
      filterData.map((data,index)=>(
        <div>
          <h1 className="font-bold text-lg">{data.filterType}</h1>
          {
            data.array.map((item, index)=>{
              return (
                <div className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={index}/>
                  <Label htmlFor="">{item}</Label>
                </div>
              )
            })
          }
        </div>
      ))

    }
    </RadioGroup>
    </div>
  )
}
