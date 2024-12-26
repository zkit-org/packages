'use client';

import {Button} from "@easykit/design";

export default function Home() {
    return <div>
        <Button variant={"destructive"}>Button</Button>
        <div className={"w-8 h-8 bg-destructive"}></div>
    </div>;
}
