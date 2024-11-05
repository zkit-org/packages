import {ResolvedPos} from '@tiptap/pm/model'
import { useCallback, useState } from 'react'

export type NodeData = {
    currentNode?: ResolvedPos;
    currentPos?: number;
    handleNodeChange: (node: ResolvedPos, nodePos: number) => void;
    setHidden: (hidden: boolean) => void;
    hidden: boolean;
}

export const useData = (): NodeData => {
    const [currentNode, setCurrentNode] = useState<ResolvedPos>();
    const [currentPos, setCurrentPos] = useState<number>();
    const [hidden, setHidden] = useState(false);

    const handleNodeChange = useCallback((node: ResolvedPos, nodePos: number) => {
        setCurrentNode(node)
        setCurrentPos(nodePos)
    }, [setCurrentNode],)

    return {
        currentNode,
        currentPos,
        handleNodeChange,
        setHidden,
        hidden
    }
}
