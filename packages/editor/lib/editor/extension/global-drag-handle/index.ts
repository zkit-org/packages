import {Extension} from '@tiptap/core';
import { Fragment, type Node, type ResolvedPos, Slice } from '@tiptap/pm/model'
import { NodeSelection, Plugin, PluginKey, TextSelection } from '@tiptap/pm/state'

// @ts-ignore
import type { EditorView } from '@tiptap/pm/view'
import { serializeForClipboard } from './clipboard-serializer'

export interface GlobalDragHandleOptions {
  /**
   * The width of the drag handle
   */
  dragHandleWidth: number;

  /**
   * The treshold for scrolling
   */
  scrollTreshold: number;

  /*
   * The css selector to query for the drag handle. (eg: '.custom-handle').
   * If handle element is found, that element will be used as drag handle. If not, a default handle will be created
   */
  dragHandleSelector?: string;

  onNodeChange?: (node: ResolvedPos, nodePos: number) => void;
  onShow?: () => void;
  onHide?: () => void;
  uniqueId?: string;
}

function absoluteRect(node: Element) {
  const data = node.getBoundingClientRect();
  const modal = node.closest('[role="dialog"]');

  if (modal && window.getComputedStyle(modal).transform !== 'none') {
    const modalRect = modal.getBoundingClientRect();

    return {
      top: data.top - modalRect.top,
      left: data.left - modalRect.left,
      width: data.width,
    };
  }
  return {
    top: data.top,
    left: data.left,
    width: data.width,
  };
}

function nodeDOMAtCoords(coords: { x: number; y: number }) {
  return document
    .elementsFromPoint(coords.x, coords.y)
    .find(
      (elem: Element) =>
        elem.parentElement?.matches?.('.ProseMirror') ||
        elem.matches(
          [
            'li',
            'p:not(:first-child)',
            'pre',
            'blockquote',
            'h1, h2, h3, h4, h5, h6',
            'div.react-renderer',
          ].join(', '),
        ),
    );
}

function nodePosAtDOM(
  node: Element,
  view: EditorView,
  options: GlobalDragHandleOptions,
) {
  const boundingRect = node.getBoundingClientRect();

  return view.posAtCoords({
    left: boundingRect.left + 50 + options.dragHandleWidth,
    top: boundingRect.top + 1,
  })?.inside;
}

function calcNodePos(pos: number, view: EditorView) {
  const $pos = view.state.doc.resolve(pos);
  if ($pos.depth > 1) return $pos.before($pos.depth);
  return pos;
}

function rootNodePos(pos: number, view: EditorView) {
  const $pos = view.state.doc.resolve(pos);
  if ($pos.depth < 1) return pos;
  return $pos.before(1) + 1;
}

const getRootNode = (pos: number, view: EditorView, node: Element, uniqueId: string) => {
  const root = view.state.doc.resolve(pos);
  if (root.node().type.name === 'doc') {
    let id = (node as HTMLElement).dataset[uniqueId];
    if (node.classList.contains("react-renderer")) {
      const item = node.firstElementChild as HTMLElement;
      id = item?.dataset[uniqueId];
    }
    if (id) {
      let node: Node | null = null;
      root.node().content.descendants((n) => {
        if (n.attrs[uniqueId] === id) {
          node = n;
        }
      })
      return node ? (node as Node).resolve(0) : root;
    }
  }
  return root;
}

export function DragHandlePlugin(options: GlobalDragHandleOptions & { pluginKey: string }) {
  let listType = '';

  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
  function handleDragStart(event: DragEvent, view: EditorView) {
    // view.focus();

    if (!event.dataTransfer) return

    const node = nodeDOMAtCoords({
      x: event.clientX + 50 + options.dragHandleWidth,
      y: event.clientY,
    })

    if (!(node instanceof Element)) return

    let draggedNodePos = nodePosAtDOM(node, view, options)
    if (draggedNodePos == null || draggedNodePos < 0) return
    const dragNode = view.state.doc.resolve(draggedNodePos)
    if (
      ['tableCell', 'tableRow'].includes(dragNode.node().type.name) ||
      node.matches('div.tableWrapper, li, blockquote')
    ) {
      draggedNodePos = rootNodePos(draggedNodePos, view) - 1
    } else {
      draggedNodePos = calcNodePos(draggedNodePos, view)
    }

    const { from, to } = view.state.selection
    const diff = from - to

    const fromSelectionPos = calcNodePos(from, view)
    let differentNodeSelected = false

    const nodePos = view.state.doc.resolve(fromSelectionPos)

    // Check if nodePos points to the top level node
    if (nodePos.node().type.name === 'doc') differentNodeSelected = true
    else {
      const nodeSelection = NodeSelection.create(view.state.doc, nodePos.before())
      // Check if the node where the drag event started is part of the current selection
      differentNodeSelected = !(
        draggedNodePos + 1 >= nodeSelection.$from.pos && draggedNodePos <= nodeSelection.$to.pos
      )
    }

    if (!differentNodeSelected && diff !== 0 && !(view.state.selection instanceof NodeSelection)) {
      const endSelection = NodeSelection.create(view.state.doc, to - 1)
      const multiNodeSelection = TextSelection.create(view.state.doc, draggedNodePos, endSelection.$to.pos)
      view.dispatch(view.state.tr.setSelection(multiNodeSelection))
    } else {
      const nodeSelection = NodeSelection.create(view.state.doc, draggedNodePos)
      view.dispatch(view.state.tr.setSelection(nodeSelection))
    }

    // If the selected node is a list item, we need to save the type of the wrapping list e.g. OL or UL
    if (view.state.selection instanceof NodeSelection && view.state.selection.node.type.name === 'listItem') {
      listType = node.parentElement!.tagName
    }

    const slice = view.state.selection.content()
    const { dom, text } = serializeForClipboard(view, slice)

    event.dataTransfer.clearData()
    event.dataTransfer.setData('text/html', dom.innerHTML)
    event.dataTransfer.setData('text/plain', text)
    event.dataTransfer.effectAllowed = 'copyMove'

    event.dataTransfer.setDragImage(node, 0, 0)

    view.dragging = { slice, move: event.ctrlKey }
  }

  let dragHandleElement: HTMLElement | null = null

  function hideDragHandle() {
    if (dragHandleElement) {
      dragHandleElement.classList.add('hidden')
      options.onHide?.()
    }
  }

  function showDragHandle() {
    if (dragHandleElement) {
      dragHandleElement.classList.remove('hidden')
      options.onShow?.()
    }
  }

  return new Plugin({
    key: new PluginKey(options.pluginKey),
    view: (view) => {
      const handleBySelector = options.dragHandleSelector
        ? document.querySelector<HTMLElement>(options.dragHandleSelector)
        : null
      dragHandleElement = handleBySelector ?? document.createElement('div')
      dragHandleElement.draggable = true
      dragHandleElement.dataset.dragHandle = ''
      dragHandleElement.classList.add('drag-handle')

      function onDragHandleDragStart(e: DragEvent) {
        view.dom.classList.add('dragging')
        handleDragStart(e, view)
      }

      dragHandleElement.addEventListener('dragstart', onDragHandleDragStart)

      function onDragHandleDragEnd() {
        view.dom.classList.remove('dragging')
      }

      dragHandleElement.addEventListener('dragend', onDragHandleDragEnd)

      function onDragHandleDrag(e: DragEvent) {
        hideDragHandle()
        const scrollY = window.scrollY
        if (e.clientY < options.scrollTreshold) {
          window.scrollTo({ top: scrollY - 30, behavior: 'smooth' })
        } else if (window.innerHeight - e.clientY < options.scrollTreshold) {
          window.scrollTo({ top: scrollY + 30, behavior: 'smooth' })
        }
      }

      dragHandleElement.addEventListener('drag', onDragHandleDrag)

      hideDragHandle()

      if (!handleBySelector) {
        view?.dom?.parentElement?.appendChild(dragHandleElement)
      }

      return {
        destroy: () => {
          if (!handleBySelector) {
            dragHandleElement?.remove?.()
          }
          dragHandleElement?.removeEventListener('drag', onDragHandleDrag)
          dragHandleElement?.removeEventListener('dragstart', onDragHandleDragStart)
          dragHandleElement = null
        },
      }
    },
    props: {
      handleDOMEvents: {
        // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
        mousemove: (view, event) => {
          if (!view.editable) {
            return
          }

          const node = nodeDOMAtCoords({
            x: event.clientX + 50 + options.dragHandleWidth,
            y: event.clientY,
          })

          const notDragging = node?.closest('.not-draggable')

          if (!(node instanceof Element) || node.matches('ul, ol') || notDragging) {
            hideDragHandle()
            return
          }

          const compStyle = window.getComputedStyle(node)
          const parsedLineHeight = Number.parseInt(compStyle.lineHeight, 10)
          const lineHeight = Number.isNaN(parsedLineHeight)
            ? Number.parseInt(compStyle.fontSize) * 1.2
            : parsedLineHeight
          const paddingTop = Number.parseInt(compStyle.paddingTop, 10)

          const boundingRect = node.getBoundingClientRect()
          const draggedNodePos = view.posAtCoords({
            left: boundingRect.left,
            top: boundingRect.top,
          })
          if (draggedNodePos == null) return
          const rootPos = rootNodePos(draggedNodePos.pos, view)
          const root = getRootNode(rootPos, view, node, options.uniqueId!)
          options.onNodeChange?.(root, rootPos)

          const rootNode = view.domAtPos(root.pos).node as Element
          let rect = absoluteRect(rootNode)
          if (node.matches('div.react-renderer, div[data-type=horizontalRule]')) {
            rect = absoluteRect(node)
          }

          rect.top += paddingTop
          rect.width = options.dragHandleWidth
          if (node.matches('div[data-type=horizontalRule]')) {
            rect.top -= (boundingRect.height + 8) / 2
          }
          if (root.node().type.name === 'codeBlock') {
            rect.top -= lineHeight + Number.parseInt(compStyle.fontSize)
          }
          if (!dragHandleElement) return

          const editorRect = view.dom.getBoundingClientRect()
          dragHandleElement.style.left = `${rect.left - rect.width}px`
          dragHandleElement.style.top = `${rect.top - editorRect.top}px`
          showDragHandle()
        },
        keydown: () => {
          hideDragHandle()
        },
        mousewheel: () => {
          hideDragHandle()
        },
        drop: (view, event) => {
          view.dom.classList.remove('dragging')
          hideDragHandle()
          let droppedNode: Node | null = null
          const dropPos = view.posAtCoords({
            left: event.clientX,
            top: event.clientY,
          })

          if (!dropPos) return

          if (view.state.selection instanceof NodeSelection) {
            droppedNode = view.state.selection.node
          }
          if (!droppedNode) return

          const resolvedPos = view.state.doc.resolve(dropPos.pos)

          const isDroppedInsideList = resolvedPos.parent.type.name === 'listItem'

          // If the selected node is a list item and is not dropped inside a list, we need to wrap it inside <ol> tag otherwise ol list items will be transformed into ul list item when dropped
          if (
            view.state.selection instanceof NodeSelection &&
            view.state.selection.node.type.name === 'listItem' &&
            !isDroppedInsideList &&
            listType === 'OL'
          ) {
            const text = droppedNode.textContent
            if (!text) return
            const paragraph = view.state.schema.nodes.paragraph?.createAndFill({}, view.state.schema.text(text))
            const listItem = view.state.schema.nodes.listItem?.createAndFill({}, paragraph)
            const newList = view.state.schema.nodes.orderedList?.createAndFill(null, listItem)
            const slice = new Slice(Fragment.from(newList), 0, 0)
            view.dragging = { slice, move: event.ctrlKey }
          }
        },
      },
    },
  })
}

const GlobalDragHandle = Extension.create({
  name: 'globalDragHandle',

  addOptions() {
    return {
      dragHandleWidth: 20,
      scrollTreshold: 100,
      uniqueId: "id",
    };
  },

  addProseMirrorPlugins() {
    return [
      DragHandlePlugin({
        pluginKey: 'globalDragHandle',
        dragHandleWidth: this.options.dragHandleWidth,
        scrollTreshold: this.options.scrollTreshold,
        dragHandleSelector: this.options.dragHandleSelector,
        onNodeChange: this.options.onNodeChange,
        onShow: this.options.onShow,
        onHide: this.options.onHide,
        uniqueId: this.options.uniqueId,
      }),
    ];
  },
});

export default GlobalDragHandle;
