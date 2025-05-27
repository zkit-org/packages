import {
  Content as DropdownContent,
  Item as DropdownItem,
  Root as DropdownRoot,
  Sub as DropdownSub,
  SubContent as DropdownSubContent,
  SubTrigger as DropdownSubTrigger,
  Trigger as DropdownTrigger,
} from '@radix-ui/react-dropdown-menu'
import { useCallback } from 'react'
import { languages, tones } from '../../../constants'
import { DropdownButton } from '../../../ui/Dropdown'
import { Icon } from '../../../ui/Icon'
import { Surface } from '../../../ui/Surface'
import { Toolbar } from '../../../ui/Toolbar'

export type AIDropdownProps = {
  onSimplify: () => void
  onFixSpelling: () => void
  onMakeShorter: () => void
  onMakeLonger: () => void
  onEmojify: () => void
  onTldr: () => void
  onTranslate: (language: string) => void
  onTone: (tone: string) => void
  onCompleteSentence: () => void
}

export const AIDropdown = ({
  onCompleteSentence,
  onEmojify,
  onFixSpelling,
  onMakeLonger,
  onMakeShorter,
  onSimplify,
  onTldr,
  onTone,
  onTranslate,
}: AIDropdownProps) => {
  const handleTone = useCallback((tone: string) => () => onTone(tone), [onTone])
  const handleTranslate = useCallback((language: string) => () => onTranslate(language), [onTranslate])

  return (
    <DropdownRoot>
      <DropdownTrigger asChild>
        <Toolbar.Button
          className="text-purple-500 hover:text-purple-600 active:text-purple-600 dark:text-purple-400 dark:active:text-purple-400 dark:hover:text-purple-300"
          activeClassname="text-purple-600 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-200"
        >
          <Icon name="Sparkles" className="mr-1" />
          AI Tools
          <Icon name="ChevronDown" className="ml-1 h-2 w-2" />
        </Toolbar.Button>
      </DropdownTrigger>
      <DropdownContent asChild>
        <Surface className="min-w-[10rem] p-2">
          <DropdownItem onClick={onSimplify}>
            <DropdownButton>
              <Icon name="CircleSlash" />
              Simplify
            </DropdownButton>
          </DropdownItem>
          <DropdownItem onClick={onFixSpelling}>
            <DropdownButton>
              <Icon name="Eraser" />
              Fix spelling & grammar
            </DropdownButton>
          </DropdownItem>
          <DropdownItem onClick={onMakeShorter}>
            <DropdownButton>
              <Icon name="ArrowLeftToLine" />
              Make shorter
            </DropdownButton>
          </DropdownItem>
          <DropdownItem onClick={onMakeLonger}>
            <DropdownButton>
              <Icon name="ArrowRightToLine" />
              Make longer
            </DropdownButton>
          </DropdownItem>
          <DropdownSub>
            <DropdownSubTrigger>
              <DropdownButton>
                <Icon name="Mic" />
                Change tone
                <Icon name="ChevronRight" className="ml-auto h-4 w-4" />
              </DropdownButton>
            </DropdownSubTrigger>
            <DropdownSubContent>
              <Surface className="flex max-h-[20rem] min-w-[15rem] flex-col overflow-auto p-2">
                {tones.map((tone) => (
                  <DropdownItem onClick={handleTone(tone.value)} key={tone.value}>
                    <DropdownButton>{tone.label}</DropdownButton>
                  </DropdownItem>
                ))}
              </Surface>
            </DropdownSubContent>
          </DropdownSub>
          <DropdownItem onClick={onTldr}>
            <DropdownButton>
              <Icon name="MoveHorizontal" />
              Tl;dr:
            </DropdownButton>
          </DropdownItem>
          <DropdownItem onClick={onEmojify}>
            <DropdownButton>
              <Icon name="SmilePlus" />
              Emojify
            </DropdownButton>
          </DropdownItem>
          <DropdownSub>
            <DropdownSubTrigger>
              <DropdownButton>
                <Icon name="Languages" />
                Translate
                <Icon name="ChevronRight" className="ml-auto h-4 w-4" />
              </DropdownButton>
            </DropdownSubTrigger>
            <DropdownSubContent>
              <Surface className="flex max-h-[20rem] min-w-[15rem] flex-col overflow-auto p-2">
                {languages.map((lang) => (
                  <DropdownItem onClick={handleTranslate(lang.value)} key={lang.value}>
                    <DropdownButton>{lang.label}</DropdownButton>
                  </DropdownItem>
                ))}
              </Surface>
            </DropdownSubContent>
          </DropdownSub>
          <DropdownItem onClick={onCompleteSentence}>
            <DropdownButton>
              <Icon name="PenLine" />
              Complete sentence
            </DropdownButton>
          </DropdownItem>
        </Surface>
      </DropdownContent>
    </DropdownRoot>
  )
}
