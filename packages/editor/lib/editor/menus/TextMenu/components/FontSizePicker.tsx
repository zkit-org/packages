import {
  Content as DropdownContent,
  Root as DropdownRoot,
  Trigger as DropdownTrigger,
} from '@radix-ui/react-dropdown-menu'
import { useCallback } from 'react'
import { DropdownButton } from '../../../ui/Dropdown'
import { Icon } from '../../../ui/Icon'
import { Surface } from '../../../ui/Surface'
import { Toolbar } from '../../../ui/Toolbar'
import { i18n } from '../../../utils/locale'

const getFontSizes = () => [
  { label: i18n('fontSize.mini'), value: '12px' },
  { label: i18n('fontSize.small'), value: '14px' },
  { label: i18n('fontSize.normal'), value: '' },
  { label: i18n('fontSize.large'), value: '18px' },
  { label: i18n('fontSize.huge'), value: '24px' },
]

export type FontSizePickerProps = {
  onChange: (value: string) => void
  value: string
}

export const FontSizePicker = ({ onChange, value }: FontSizePickerProps) => {
  const currentValue = getFontSizes().find((size) => size.value === value)
  const currentSizeLabel = currentValue?.label?.split(' ')[0] || i18n('default')

  const selectSize = useCallback((size: string) => () => onChange(size), [onChange])

  return (
    <DropdownRoot>
      <DropdownTrigger asChild>
        <Toolbar.Button active={!!currentValue?.value}>
          {currentSizeLabel}
          <Icon name="ChevronDown" className="h-2 w-2" />
        </Toolbar.Button>
      </DropdownTrigger>
      <DropdownContent asChild>
        <Surface className="flex flex-col gap-1 px-2 py-4">
          {getFontSizes().map((size) => (
            <DropdownButton
              isActive={value === size.value}
              onClick={selectSize(size.value)}
              key={`${size.label}_${size.value}`}
            >
              <span style={{ fontSize: size.value }}>{size.label}</span>
            </DropdownButton>
          ))}
        </Surface>
      </DropdownContent>
    </DropdownRoot>
  )
}
