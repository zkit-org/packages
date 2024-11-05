import { Node } from '@tiptap/pm/model'
import { Editor, NodeViewWrapper } from '@tiptap/react'
import { useCallback, useRef } from 'react'
import classNames from "classnames";

interface ImageBlockViewProps {
    editor: Editor
    getPos: () => number
    node: Node
    updateAttributes: (attrs: Record<string, string>) => void
    HTMLAttributes: Record<string, any>
}

export const ImageBlockView = (props: ImageBlockViewProps) => {
    const { editor, getPos, node } = props as ImageBlockViewProps & {
        node: Node & {
            attrs: {
                src: string
            }
        }
    }
    const imageWrapperRef = useRef<HTMLDivElement>(null)
    const { src } = node.attrs

    const wrapperClassName = classNames(
        node.attrs.align === 'left' ? 'ml-0' : 'ml-auto',
        node.attrs.align === 'right' ? 'mr-0' : 'mr-auto',
        node.attrs.align === 'center' && 'mx-auto',
    )

    const onClick = useCallback(() => {
        editor.commands.setNodeSelection(getPos())
    }, [getPos, editor.commands])

    return (
        <NodeViewWrapper {...props.HTMLAttributes}>
            <div className={wrapperClassName} style={{ width: node.attrs.width }}>
                <div contentEditable={false} ref={imageWrapperRef}>
                    <img className="block" src={src} alt="" onClick={onClick} />
                </div>
            </div>
        </NodeViewWrapper>
    )
}

export default ImageBlockView