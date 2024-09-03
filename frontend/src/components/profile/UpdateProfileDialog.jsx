import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

export const UpdateProfileDialog = () => {
  return (
    <div>
        <Dialog open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" className="col-span-3" name="name"/>


                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    </div>
  )
}
