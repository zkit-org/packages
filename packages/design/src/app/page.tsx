'use client';

import {Button, Loading} from "@easykit/design";

export default function Home() {
    return <div>
        <Loading loading={true}>
            <Button variant={"destructive"}>Button</Button>
            <div className={"w-8 h-8 bg-destructive"}></div>
        </Loading>
    </div>;
}
