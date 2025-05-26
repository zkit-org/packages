import {
  Empty,
  type EmptyProps,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  Spin,
  Tree,
  type TreeData,
  cn,
  useSize,
} from '@easykit/design'
import { Button } from '@easykit/design/components/ui/button'
import { CaretSortIcon, Cross2Icon } from '@radix-ui/react-icons'
import classNames from 'classnames'
import { type FC, type ReactNode, useEffect, useMemo, useRef, useState } from 'react'

export type TreeSelectProps = {
  className?: string
  treeData: TreeData[]
  clearable?: boolean
  value?: string
  onChange?: (value?: string) => void
  loading?: boolean
  placeholder?: string
  contentClassName?: string
  emptyProps?: EmptyProps
}

const getTitleFromTreeData = (treeData: TreeData[], key: string): ReactNode => {
  // 迭代所有 children
  for (const item of treeData) {
    if (item.key === key) {
      return item.title
    }
    if (item.children) {
      const title = getTitleFromTreeData(item.children, key)
      if (title) {
        return title
      }
    }
  }
}

export const TreeSelect: FC<TreeSelectProps> = (props) => {
  const {
    value,
    onChange,
    className,
    treeData,
    clearable = false,
    loading = false,
    placeholder,
    contentClassName,
    emptyProps,
  } = props
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const size = useSize(containerRef)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [expandedKeys, setExpandedKeys] = useState<string[]>([])

  const showClear = useMemo(() => clearable && selectedKeys.length, [clearable, selectedKeys])
  const showValue = useMemo(() => {
    if (selectedKeys.length > 0) {
      return getTitleFromTreeData(treeData, selectedKeys[0])
    }
    return <span className="text-secondary-foreground/50">{placeholder}</span>
  }, [treeData, selectedKeys, placeholder])

  useEffect(() => {
    if (value) {
      setSelectedKeys([value])
    } else {
      setSelectedKeys([])
    }
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={loading}>
        <Button
          ref={containerRef}
          variant="outline"
          aria-expanded={open}
          className={cn(
            'group h-9 min-w-[150px] items-center justify-between px-2 py-1 align-middle hover:bg-secondary/40',
            className
          )}
          disabled={loading}
        >
          <div className="flex flex-1 items-center justify-center">
            <div className="flex flex-1">{showValue}</div>
            {loading ? (
              <Spin />
            ) : (
              <div className="flex items-center">
                <CaretSortIcon className={cn('block h-4 w-4', showClear ? 'group-hover:hidden' : '')} />
                <Cross2Icon
                  onClick={(e) => {
                    setSelectedKeys([])
                    onChange?.(undefined)
                    e.stopPropagation()
                  }}
                  className={cn('hidden h-4 w-4', showClear ? 'group-hover:block' : '')}
                />
              </div>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" style={{ width: size.width }}>
        <ScrollArea className={classNames('flex max-h-[30vh] flex-col', contentClassName)}>
          {treeData?.length ? (
            <Tree
              expandedKeys={expandedKeys}
              onExpand={(expandedKeys) => setExpandedKeys(expandedKeys as string[])}
              selectedKeys={selectedKeys}
              onSelect={(selectedKeys, { selected }) => {
                if (selected) {
                  onChange?.(selectedKeys[0] as string)
                  setSelectedKeys(selectedKeys as string[])
                }
                setOpen(false)
              }}
              treeData={treeData}
            />
          ) : (
            <Empty {...(emptyProps ?? {})} />
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
