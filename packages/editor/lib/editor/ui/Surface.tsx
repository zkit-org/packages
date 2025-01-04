import { cn } from '../utils'
import { HTMLProps } from 'react'

export type SurfaceProps = HTMLProps<HTMLDivElement> & {
  withShadow?: boolean
  withBorder?: boolean
}

export const Surface = ({ children, className, withShadow = true, withBorder = true, ...props }: SurfaceProps) => {
    const surfaceClass = cn(
        className,
        'bg-white rounded-lg dark:bg-black',
        withShadow ? 'shadow-sm' : '',
        withBorder ? 'border border-neutral-200 dark:border-neutral-800' : '',
    )

    return (
        <div className={surfaceClass} {...props}>
            {children}
        </div>
    )
};

Surface.displayName = 'Surface'
