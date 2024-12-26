'use client';

import {Button} from "@easykit/design";

const Page = () => {

    return <div className={"p-4"}>
        <div className={"p-4 bg-secondary"}>
            <div className={"w-8 h-8 action-effect action-effect-active"}>1</div>
        </div>
        <div className={"w-8 h-8 action-effect action-effect-active"}>1</div>
        <Button>Test</Button>
    </div>
}

export default Page;
