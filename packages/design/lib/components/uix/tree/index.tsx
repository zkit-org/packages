import RCTree, { TreeProps as RCTreeProps, BasicDataNode, TreeNodeProps } from "rc-tree";
import "rc-tree/assets/index.css";
import "./style.scss";
import {forwardRef, ReactNode} from "react";
import {TriangleDownIcon, TriangleRightIcon} from "@radix-ui/react-icons";

export type TreeData = {
    key: string;
    title: ReactNode;
    children?: TreeData[];
} & BasicDataNode;

export type TreeProps = Omit<RCTreeProps<TreeData>, "prefixCls"> & {
    prefixCls?: string;
};

export const Tree = forwardRef<RCTree<TreeData>, TreeProps>((props, ref) => {
    return <RCTree<TreeData>
        ref={ref}
        prefixCls={"rc-tree"}
        showIcon={false}
        dropIndicatorRender={({ dropPosition, dropLevelOffset, indent }) => {
            return <div
                style={{left: indent * -(dropLevelOffset + dropPosition), bottom: -13, height: 3}}
                className={"absolute right-1 bg-primary rounded-sm pointer-events-none"}
            />;
        }}
        switcherIcon={(props: TreeNodeProps) => {
            const {expanded, isLeaf} = props;
            if(isLeaf) return null;
            return expanded ? <TriangleDownIcon className={"w-5 h-5"}/> : <TriangleRightIcon className={"w-5 h-5"}/>;
        }}
        {...props}
    />
})
