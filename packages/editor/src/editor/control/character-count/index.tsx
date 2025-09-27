import type { FC } from "react";
import type { Editor } from "@tiptap/react";

export type CharacterCountControlProps = {
  editor: Editor;
  limit: number;
};

export const CharacterCountControl: FC<CharacterCountControlProps> = (props) => {
  const { editor, limit } = props;
  if (!editor) return null;

  const percentage = editor ? Math.round((100 / limit) * editor.storage.characterCount.characters()) : 0;

  return (
    <div
      className={`character-count ${editor.storage.characterCount.characters() === limit ? "character-count--warning" : ""}`}
    >
      <svg height="20" viewBox="0 0 20 20" width="20">
        <title>字符计数进度环</title>
        <circle cx="10" cy="10" fill="#e9ecef" r="10" />
        <circle
          cx="10"
          cy="10"
          fill="transparent"
          r="5"
          stroke="currentColor"
          strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
          strokeWidth="10"
          transform="rotate(-90) translate(-20)"
        />
        <circle cx="10" cy="10" fill="white" r="6" />
      </svg>
      {editor.storage.characterCount.characters()} / {limit} characters
      <br />
      {editor.storage.characterCount.words()} words
    </div>
  );
};
