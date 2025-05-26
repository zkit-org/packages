import RCTree, { type TreeProps as RCTreeProps, type BasicDataNode, type TreeNodeProps } from 'rc-tree'
import "rc-tree/assets/index.css";
import './style.scss'
import {TriangleDownIcon, TriangleRightIcon} from "@radix-ui/react-icons";
import type { FC, ReactNode } from 'react'

export type TreeData = {
  key: string
  title: ReactNode
  children?: TreeData[]
} & BasicDataNode

export type TreeProps = Omit<RCTreeProps<TreeData>, "prefixCls"> & {
  prefixCls?: string;
};

export const Tree: FC<TreeProps> = (props) => {
  return (
    <RCTree<TreeData>
      prefixCls="rc-tree"
      showIcon={false}
      dropIndicatorRender={({ dropPosition, dropLevelOffset, indent }) => {
        return (
          <div
            style={{ left: indent * -(dropLevelOffset + dropPosition), bottom: -13, height: 3 }}
            className="pointer-events-none absolute right-1 rounded-sm bg-primary"
          />
        )
      }}
      switcherIcon={(props: TreeNodeProps) => {
        const { expanded, isLeaf } = props
        if (isLeaf) return null
        return expanded ? <TriangleDownIcon className="h-5 w-5" /> : <TriangleRightIcon className="h-5 w-5" />
      }}
      {...props}
    />
  )
}
