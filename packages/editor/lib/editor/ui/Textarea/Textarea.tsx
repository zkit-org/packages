import cn from 'classnames'
import { type TextareaHTMLAttributes, forwardRef } from 'react'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...rest }, ref) => {
    const textAreaClassName = cn(
      'block h-[4.5rem] w-full rounded-lg border-0 bg-black/5 px-2 py-1 font-medium text-black text-sm caret-black',
      'dark:bg-white/10 dark:text-white dark:caret-white',
      'hover:bg-black/10',
      'dark:hover:bg-white/20',
      'focus:bg-transparent focus:outline focus:outline-black active:bg-transparent active:outline active:outline-black',
      'dark:active:outline-white dark:focus:outline-white',
      className
    )

    return <textarea className={textAreaClassName} ref={ref} {...rest} />
  }
)

Textarea.displayName = 'Textarea'
