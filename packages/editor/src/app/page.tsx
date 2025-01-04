"use client";

import "@/plugin/locales";
import "@easykit/design/globals.css";
import "@easykit/design/style.css";
import {Editor} from "@easykit/editor";

export default function Home() {
    return <div className={"p-4 flex justify-center items-start"}>
        <div className={"m-8 max-w-[860px] w-full"}>
            <Editor
                slashCommandProps={{
                    groups: [
                        {
                            name: 'ai',
                            title: "AI",
                            position: "start",
                            commands: [
                                {
                                    name: 'aiWriter',
                                    label: "AI Writer",
                                    iconName: 'Sparkles',
                                    description: "Generate text with AI",
                                    shouldBeHidden: editor => editor.isActive('columns'),
                                    action: editor => editor.chain().focus()//.setAiWriter().run(),
                                },
                                {
                                    name: 'aiImage',
                                    label: "AI Image",
                                    iconName: 'Sparkles',
                                    description: "Generate image with AI",
                                    shouldBeHidden: editor => editor.isActive('columns'),
                                    action: editor => editor.chain().focus()//.setAiImage().run(),
                                },
                            ],
                        },
                    ]
                }}
            />
        </div>
    </div>;
}
