import {FC} from "react";
import { Editor } from '@tiptap/react'

export type CharacterCountControlProps = {
    editor: Editor;
    limit: number;
}

export const CharacterCountControl: FC<CharacterCountControlProps> = (props) => {
    const {
        editor,
        limit
    } = props;
    if (!editor) return null;

    const percentage = editor
        ? Math.round((100 / limit) * editor.storage.characterCount.characters())
        : 0;

    return <div
        className={`character-count ${editor.storage.characterCount.characters() === limit ? 'character-count--warning' : ''}`}>
        <svg
            height="20"
            width="20"
            viewBox="0 0 20 20"
        >
            <circle
                r="10"
                cx="10"
                cy="10"
                fill="#e9ecef"
            />
            <circle
                r="5"
                cx="10"
                cy="10"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
                transform="rotate(-90) translate(-20)"
            />
            <circle
                r="6"
                cx="10"
                cy="10"
                fill="white"
            />
        </svg>

        {editor.storage.characterCount.characters()} / {limit} characters
        <br/>
        {editor.storage.characterCount.words()} words
    </div>
}
