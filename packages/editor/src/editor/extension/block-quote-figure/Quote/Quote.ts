import { Node } from "@tiptap/core";

export const Quote = Node.create({
  name: "quote",

  content: "text*",

  defining: true,

  marks: "",

  parseHTML() {
    return [
      {
        tag: "blockquote",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["blockquote", HTMLAttributes, 0];
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () => false,
    };
  },
});

export default Quote;
