import {createPortal} from 'react-dom'

import type { LoaderProps, LoadingWrapperProps } from './types' 

const LoadingWrapper = ({label}: LoadingWrapperProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-black p-4 text-white shadow-2xl dark:bg-white dark:text-black">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8 animate-spin"
      >
        <title>Loading</title>
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      {label && <p className="font-semibold text-sm text-white leading-tight dark:text-black">{label}</p>}
    </div>
  )
}

export const Loader = ({hasOverlay = true, label}: LoaderProps) => {
  return hasOverlay ? (
    createPortal(
      <div className="fixed top-0 left-0 z-[9999] flex h-full w-full select-none items-center justify-center bg-black/60">
        <LoadingWrapper label={label} />
      </div>,
      document.body
    )
  ) : (
    <LoadingWrapper label={label} />
  )
}

export default Loader
