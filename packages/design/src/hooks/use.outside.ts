import { useEffect } from 'react'

/**
 * Hook that alerts clicks outside of the passed ref
 */

// biome-ignore lint/suspicious/noExplicitAny: <refs>
export const useOutside = (call: () => void, refs: any) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */

    // biome-ignore lint/suspicious/noExplicitAny: <event>
    const handleClickOutside = (event: any) => {
      if (!refs) return
      // biome-ignore lint/suspicious/noExplicitAny: <hit>
      const hit = refs.filter((ref: any) => !ref.current.contains(event.target))
      if (hit.length === refs.length) {
        call()
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [refs, call])
}
