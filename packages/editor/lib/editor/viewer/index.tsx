import styles from '../style.module.scss';
import "../editor.css";
import {FC} from "react";
import classNames from "classnames";
import {EditorContent} from "@tiptap/react";
import {useEditor} from "../hooks";

export type ContentViewerProps = {
  value?: string;
  onChange?: (value: string) => void;
}

export const ContentViewer: FC<ContentViewerProps> = (props) => {
  const {value, onChange} = props;
  const [editor] = useEditor({
    value,
    editable: false,
    onReadOnlyChange: onChange,
  });

  return <div className={styles.editorContainer}>
    <EditorContent
      className={classNames(styles.editor, styles.readonly)}
      editor={editor}
    />
  </div>
}
