import { cn } from '@easykit/design/lib'
import classNames from 'classnames'
import type { FC, PropsWithChildren, ReactNode } from 'react'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Card as UICard } from '../../ui/card'

export interface CardProps extends PropsWithChildren {
  footer?: ReactNode
  title?: ReactNode
  description?: ReactNode
  className?: string
  contentClassName?: string
  onClick?: () => void
  shadow?: boolean
}

export const Card: FC<CardProps> = (props) => {
  const { title = '', description = '', className, contentClassName, footer, shadow = false } = props

  return (
    <UICard onClick={props.onClick} className={classNames(shadow ? null : 'shadow-none', className)}>
      {title || description ? (
        <CardHeader className="pb-0">
          {title ? <CardTitle>{title}</CardTitle> : null}
          {description ? <CardDescription>{description}</CardDescription> : null}
        </CardHeader>
      ) : null}
      <CardContent className={cn('px-6', contentClassName)}>{props.children}</CardContent>
      {footer ? <CardFooter>{footer}</CardFooter> : null}
    </UICard>
  )
}
