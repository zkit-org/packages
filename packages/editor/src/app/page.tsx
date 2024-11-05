"use client";

import "@/plugin/locales";
import "./globals.css";
import {Editor} from "@easykit/editor";

export default function Home() {
    return <div className={"p-4 flex justify-center items-start"}>
        <div className={"m-8 max-w-[860px] w-full"}>
            <Editor />
        </div>
    </div>;
}
