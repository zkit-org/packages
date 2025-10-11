import type { FC } from 'react'
import classNames from 'classnames'

export type TabsTitleItem = {
  id: string
  title: string
}

export type TabsTitleProps = {
  items: TabsTitleItem[]
  active: string
  onChange?: (id: string) => void
  className?: string
}

export const TabsTitle: FC<TabsTitleProps> = (props) => {
  const { items = [], active } = props
  return (
    <div className={classNames('flex items-center justify-start', props.className)}>
      {items.map((item) => {
        const isActive = active === item.id
        return (
          <div
            className={classNames(
              'cursor-pointer border-transparent border-b-2 px-4 py-2 text-muted-foreground',
              isActive && '!border-primary text-primary',
              'hover:border-secondary hover:text-primary'
            )}
            key={item.id}
            onClick={() => props.onChange?.(item.id)}
          >
            {item.title}
          </div>
        )
      })}
    </div>
  )
}
