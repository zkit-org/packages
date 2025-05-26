import { ChevronDownIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import classNames from "classnames";
import type { FC } from 'react'

export type ExpandActionProps = {
  enable: boolean
  expanded: boolean
  onClick?: () => void
} 

export const ExpandAction: FC<ExpandActionProps> = (props) => {
  const {enable, expanded, onClick} = props;
  return (
    <div
      onClick={onClick}
      className={classNames(
        'flex h-6 w-6 items-center justify-center rounded-sm ',
        enable ? 'cursor-pointer bg-[rgba(0,0,0,0.05)] hover:bg-[rgba(0,0,0,0.1)]' : ''
      )}
    >
      {enable ? expanded ? <ChevronDownIcon /> : <ChevronRightIcon /> : null}
    </div>
  )
}
