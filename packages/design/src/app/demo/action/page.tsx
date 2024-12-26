'use client';

import {Button} from "@easykit/design";

const Page = () => {

    return <div className={"p-4"}>
        <div className={"p-4 bg-secondary"}>
            <button disabled={true} className={"w-8 h-8 action-effect action-effect-active action-active action-effect-disabled"}>1</button>
        </div>
        <button disabled={true} className={"w-8 h-8 action-effect action-effect-active action-active action-effect-disabled"}>1</button>
        <Button>Test</Button>
    </div>
}

export default Page;
