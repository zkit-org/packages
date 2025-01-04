import styles from './style.module.scss';
import "./editor.css";
import { EditorContent } from '@tiptap/react'
import {forwardRef, useRef, useImperativeHandle} from "react";
import {EditorController} from "./control";
import {Editor as EditorInstance, EditorEvents} from '@tiptap/core';
import {useEditor} from './hooks';
import {Extensions} from '@tiptap/core';
import {SlashCommandProps} from './extension/slash-command';

export type EditorProps = {
    limit?: number;
    value?: string;
    onChange?: (value: string) => void;
    onCreate?: (props: EditorEvents['create']) => void;
    extensions?: Extensions;
    slashCommandProps?: SlashCommandProps;
}

export type EditorRef = {
    editor: EditorInstance | null;
}

export const Editor = forwardRef<EditorRef, EditorProps>((props, ref) => {
    const {
        limit,
        value, onChange,
        onCreate,
        extensions,
        slashCommandProps,
    } = props;
    const menuContainerRef = useRef<HTMLDivElement>(null);
    const [editor, data, handleId] = useEditor({
        limit, value, onChange,
        onCreate,
        extensions,
        slashCommandProps
    });

    useImperativeHandle(ref, () => ({
        editor,
    }), [editor]);

    return <div className={styles.editorContainer} ref={menuContainerRef}>
        <EditorContent
            className={styles.editor}
            editor={editor}
        />
        <EditorController
            editor={editor}
            limit={limit}
            appendTo={menuContainerRef}
            handleId={handleId}
            data={data}
        />
    </div>
});
