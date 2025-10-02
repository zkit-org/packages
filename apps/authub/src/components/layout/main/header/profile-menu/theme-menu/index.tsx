import {
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@easykit/design'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'

export const ThemeMenu = () => {
  const { theme, setTheme } = useTheme()
  const { t } = useTranslation()
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>{t('主题设置')}</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuLabel className="text-secondary-foreground/50">{t('主题设置')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup onValueChange={setTheme} value={theme}>
            <DropdownMenuRadioItem value="light">{t('浅色')}</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">{t('深色')}</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system">{t('跟随系统')}</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}
