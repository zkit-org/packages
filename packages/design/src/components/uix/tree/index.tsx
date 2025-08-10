import RCTree, { type BasicDataNode, type TreeProps as RCTreeProps, type TreeNodeProps } from 'rc-tree'
import 'rc-tree/assets/index.css'
import './style.scss'

import type { FC, ReactNode } from 'react'
import { TriangleDownIcon, TriangleRightIcon } from '@radix-ui/react-icons'

export type TreeData = {
  key: string
  title: ReactNode
  children?: TreeData[]
} & BasicDataNode

export type TreeProps = Omit<RCTreeProps<TreeData>, 'prefixCls'> & {
  prefixCls?: string
}

export const Tree: FC<TreeProps> = (props) => {
  return (
    <RCTree<TreeData>
      dropIndicatorRender={({ dropPosition, dropLevelOffset, indent }) => {
        return (
          <div
            className="pointer-events-none absolute right-1 rounded-sm bg-primary"
            style={{ left: indent * -(dropLevelOffset + dropPosition), bottom: -13, height: 3 }}
          />
        )
      }}
      prefixCls="rc-tree"
      showIcon={false}
      switcherIcon={(props: TreeNodeProps) => {
        const { expanded, isLeaf } = props
        if (isLeaf) return null
        return expanded ? <TriangleDownIcon className="h-5 w-5" /> : <TriangleRightIcon className="h-5 w-5" />
      }}
      {...props}
    />
  )
}
