/* eslint-disable react/react-in-jsx-scope */
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from '@/components/ui/dialog'
import { useState } from 'react'
import { CategoryProvider } from '../../context/category.context'
import { CardWithForm } from '../add-card-product'

export const DialogProduct = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <CategoryProvider>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="ml-[94%] ring ring-amber-50 rounded-2xl text-center hover:bg-gray-700 hover:ring-transparent pl-2 pr-2">Crear</DialogTrigger>
        <DialogContent>
          <div className='h-full'>
            <CardWithForm />
          </div>
        </DialogContent>
      </Dialog>
      </CategoryProvider>
    </>
  )
}