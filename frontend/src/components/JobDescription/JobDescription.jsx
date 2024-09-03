import React from 'react'
import { Navbar } from '../shared/Navbar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

export const JobDescription = () => {

    const isApplied=true

  return (
    <div>
        <Navbar/>

        <div className="max-w-7xl mx-auto py-5">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="font-bold text-xl">Frontend Developer</h1>
                    <div className="flex items-center mt-3 gap-4">
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">12 position</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">Part time</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">24LPA</Badge>
                    </div>
                </div>

                <Button 
                disable={isApplied} 
                className={`text-sm rounded-lg ${isApplied?'bg-gray-600 cursor-not-allowed':'bg-[#6A38C2] hover:bg-[#5A2DA9]'}`}>
                    {isApplied?'Already Applied':'Apply Now'}
                </Button>
            </div>

            <h1 className="border-b-2 border-b-gray-300 font-medium mt-6">Job Description</h1>
            <div className="my-4">
                <h1 className="font-bold my-1">Role :<span className="pl-4 font-normal text-gray-800">FrontEnd Developer</span></h1>
                <h1 className="font-bold my-1">Location :<span className="pl-4 font-normal text-gray-800">Delhi</span></h1>
                <h1 className="font-bold my-1">Experience :<span className="pl-4 font-normal text-gray-800">2 Year</span></h1>
                <h1 className="font-bold my-1">Salary :<span className="pl-4 font-normal text-gray-800">12 LPA</span></h1>
                <h1 className="font-bold my-1">Total Applicants: <span className="pl-4 font-normal text-gray-800">20</span></h1>
                <h1 className="font-bold my-1">Posted Date :<span className="pl-4 font-normal text-gray-800">12-08-2025</span></h1>
                <h1 className="font-bold my-1">Description :<span className="pl-4 font-normal text-gray-800">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo repellat eaque modi doloribus iusto, ullam, esse animi illo deserunt aperiam asperiores recusandae nam dolor vitae veniam rem. Dicta, odio debitis Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat eum nisi quod maiores optio aliquid expedita sunt, nihil ipsum error vel illum natus! Molestias id consequatur dolorum dolor illum voluptas?
                .</span></h1>
                {/* <h1 className="font-bold my-1">Role:<span className="pl-4 font-normal text-gray-800">FrontEnd Developer</span></h1>
                <h1 className="font-bold my-1">Role:<span className="pl-4 font-normal text-gray-800">FrontEnd Developer</span></h1> */}
            </div>


        </div>

    </div>
  )
}
