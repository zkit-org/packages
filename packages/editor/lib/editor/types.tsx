import { TiptapCollabProvider } from '@hocuspocus/provider'
import type { Doc as YDoc } from 'yjs'

export interface TiptapProps {
  aiToken: string
  hasCollab: boolean
  ydoc: YDoc
  provider?: TiptapCollabProvider | null | undefined
}

export type EditorUser = {
  clientId: string
  name: string
  color: string
  initials?: string
}

export type LanguageOption = {
  name: string
  label: string
  value: string
}

export type AiTone =
  | 'academic'
  | 'business'
  | 'casual'
  | 'childfriendly'
  | 'conversational'
  | 'emotional'
  | 'humorous'
  | 'informative'
  | 'inspirational'
  | string

export type AiPromptType = 'SHORTEN' | 'EXTEND' | 'SIMPLIFY' | 'TONE'

export type AiToneOption = {
  name: string
  label: string
  value: AiTone
}

export type AiImageStyle = {
  name: string
  label: string
  value: string
}
