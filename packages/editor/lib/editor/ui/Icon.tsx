import {icons} from 'lucide-react'
import {memo} from 'react'
import classNames from "classnames";

export type IconProps = {
  name: keyof typeof icons
  className?: string
  strokeWidth?: number
}

export const Icon = memo(({name, className, strokeWidth}: IconProps) => {
  const IconComponent = icons[name]

  if (!IconComponent) {
    return null
  }

  return <IconComponent className={classNames('w-4 h-4', className)} strokeWidth={strokeWidth || 2.5}/>
})

Icon.displayName = 'Icon'
