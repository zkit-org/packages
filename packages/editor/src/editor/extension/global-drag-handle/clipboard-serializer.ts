import type { Slice } from "@tiptap/pm/model";
import type { EditorView } from "@tiptap/pm/view";
import * as pmView from "@tiptap/pm/view";

function getPmView() {
  try {
    return pmView;
  } catch (_error) {
    return null;
  }
}

export function serializeForClipboard(view: EditorView, slice: Slice) {
  // Newer Tiptap/ProseMirror
  if (view && typeof view.serializeForClipboard === "function") {
    return view.serializeForClipboard(slice);
  }

  // Older version fallback
  const proseMirrorView = getPmView();
  // @ts-expect-error
  if (proseMirrorView && typeof proseMirrorView?.__serializeForClipboard === "function") {
    // @ts-expect-error
    return proseMirrorView.__serializeForClipboard(view, slice);
  }

  throw new Error("No supported clipboard serialization method found.");
}
