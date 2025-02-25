import {IconDark, IconLight, IconSystem} from "@arco-iconbox/react-clover";
import {useTheme} from "next-themes";
import classNames from "classnames";
import {useEffect, useState} from "react";

export type Theme = {
  name: string;
  icon: any;
}

const themes: Theme[] = [
  {
    name: "light",
    icon: IconLight
  },
  {
    name: "system",
    icon: IconSystem
  },
  {
    name: "dark",
    icon: IconDark
  }
]

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const {theme, setTheme} = useTheme();

  useEffect(() => {
    setMounted(true)
  }, [])

  return <div className={"border rounded-full p-1 flex"} key={`switcher-${mounted}`}>
    {
      themes.map((item) => {
        const Icon = item.icon;
        return <div key={item.name} className={classNames(
          "w-8 h-8 flex justify-center items-center rounded-full cursor-pointer",
          theme === item.name ? "bg-secondary" : ""
        )} onClick={() => setTheme(item.name)} suppressHydrationWarning={true}>
          <Icon className={"text-lg"}/>
        </div>
      })
    }
  </div>
}
