'use client';

import {Button, Sheet, SheetContent, SheetTitle} from "@easykit/design";
import {useState} from "react";

const Page = () => {
    const [open, setOpen] = useState(false);

    return <div className={"p-4"}>
        <Button onClick={() => setOpen(true)}>确认</Button>
        <Sheet
            open={open}
            onOpenChange={setOpen}
        >
            <SheetTitle />
            <SheetContent>
                content
            </SheetContent>
        </Sheet>
    </div>
}

export default Page;
