import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'

export const AppliedJobTable = () => {
  return (
    <div>
    
        <Table>

            <TableCaption>List of your Applied jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                    {/* <TableHead> </TableHead>
                    <TableHead> </TableHead> */}
                </TableRow>
            </TableHeader>

            <TableBody>
                {
                    [1,2,3,4,5].map((item,index)=>(
                        <TableRow key={index}>
                            <TableCell>12-07-2024</TableCell>
                            <TableCell>Software Developer</TableCell>
                            <TableCell>Google</TableCell>
                            <TableCell className="text-right"><Badge> Pending</Badge></TableCell>
                        
                        </TableRow>
                    ))
                }
            </TableBody>


        </Table>

    </div>
  )
}
