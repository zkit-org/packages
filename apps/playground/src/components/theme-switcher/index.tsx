import { useEffect, useState } from 'react'
import { IconDark, IconLight, IconSystem } from '@arco-iconbox/react-clover'
import classNames from 'classnames'
import { useTheme } from 'next-themes'

export type Theme = {
  name: string
  // biome-ignore lint/suspicious/noExplicitAny: <icon>
  icon: any
}

const themes: Theme[] = [
  {
    name: 'light',
    icon: IconLight,
  },
  {
    name: 'system',
    icon: IconSystem,
  },
  {
    name: 'dark',
    icon: IconDark,
  },
]

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex rounded-full border p-1" key={`switcher-${mounted}`}>
      {themes.map((item) => {
        const Icon = item.icon
        return (
          <div
            className={classNames(
              'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full',
              theme === item.name ? 'bg-secondary' : ''
            )}
            key={item.name}
            onClick={() => setTheme(item.name)}
            suppressHydrationWarning={true}
          >
            <Icon className="text-lg" />
          </div>
        )
      })}
    </div>
  )
}
