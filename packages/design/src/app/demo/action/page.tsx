'use client';

import { Action, Button } from '@easykit/design'

const Page = () => {

  return (
    <div className="p-4">
      <div className="bg-secondary p-4">
        <button
          type="button"
          disabled={true}
          className="action-effect action-effect-active action-active action-effect-disabled h-8 w-8"
        >
          1
        </button>
      </div>
      <button
        type="button"
        disabled={true}
        className="action-effect action-effect-active action-active action-effect-disabled h-8 w-8"
      >
        1
      </button>
      <Button>Test</Button>
      <Action>Test Action</Action>
    </div>
  )
}

export default Page;
