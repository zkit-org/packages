'use client'

import { Avatar } from '@easykit/design'

const Page = () => {
  return (
    <div className="p-4">
      <Avatar
        className="size-20 rounded-md"
        fallback="A"
        fallbackClassName="rounded-md text-primary-foreground bg-primary"
        src="https://github.com/shadcn.png"
      />
    </div>
  )
}

export default Page
