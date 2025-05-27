import { type ChangeEvent, type FormEvent, useCallback, useMemo, useState } from 'react'
import {Button} from '../../ui/Button'
import {Icon} from '../../ui/Icon'
import {Surface} from '../../ui/Surface'
import { Toggle } from '../../ui/Toggle'
import {i18n} from "../../utils/locale";

const URL_REGEX = /^(\S+):(\/\/)?\S+$/

export type LinkEditorPanelProps = {
  initialUrl?: string
  initialOpenInNewTab?: boolean
  onSetLink: (url: string, openInNewTab?: boolean) => void
}

export const useLinkEditorState = ({initialUrl, initialOpenInNewTab, onSetLink}: LinkEditorPanelProps) => {
  const [url, setUrl] = useState(initialUrl || '')
  const [openInNewTab, setOpenInNewTab] = useState(initialOpenInNewTab)

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value)
  }, [])

  const isValidUrl = useMemo(() => URL_REGEX.test(url), [url])

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      if (isValidUrl) {
        onSetLink(url, openInNewTab)
      }
    },
    [url, isValidUrl, openInNewTab, onSetLink]
  )

  return {
    url,
    setUrl,
    openInNewTab,
    setOpenInNewTab,
    onChange,
    handleSubmit,
    isValidUrl,
  }
}

export const LinkEditorPanel = ({onSetLink, initialOpenInNewTab, initialUrl}: LinkEditorPanelProps) => {
  const state = useLinkEditorState({onSetLink, initialOpenInNewTab, initialUrl})

  return (
    <Surface className="p-2">
      <form onSubmit={state.handleSubmit} className="flex items-center gap-2">
        <label className="flex cursor-text items-center gap-2 rounded-lg bg-neutral-100 p-2 dark:bg-neutral-900">
          <Icon name="Link" className="flex-none text-black dark:text-white" />
          <input
            type="url"
            className="min-w-[12rem] flex-1 bg-transparent text-black text-sm outline-none dark:text-white"
            placeholder={i18n('panel.linkEditor.input')}
            value={state.url}
            onChange={state.onChange}
          />
        </label>
        <Button variant="primary" buttonSize="small" type="submit" disabled={!state.isValidUrl}>
          {i18n('panel.linkEditor.submit')}
        </Button>
      </form>
      <div className="mt-3">
        <span className="flex cursor-pointer select-none items-center justify-start gap-2 font-semibold text-neutral-500 text-sm dark:text-neutral-400">
          {i18n('panel.linkEditor.newTab')}
          <Toggle active={state.openInNewTab} onChange={state.setOpenInNewTab} />
        </span>
      </div>
    </Surface>
  )
}
