'use client'

import { useState } from 'react'
import { Button, Sheet, SheetContent, SheetTitle } from '@easykit/design'

const Page = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>确认</Button>
      <Sheet onOpenChange={setOpen} open={open}>
        <SheetTitle />
        <SheetContent>content</SheetContent>
      </Sheet>
    </div>
  )
}

export default Page
