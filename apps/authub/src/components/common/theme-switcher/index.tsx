import { type FC, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { type LucideIcon, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";

type HTMLViewTransition = { ready?: Promise<void> };
type DocumentWithViewTransition = Document & {
  startViewTransition?: (cb: () => void) => HTMLViewTransition;
};

export type Theme = {
  name: string;
  icon: LucideIcon;
};

const themes: Theme[] = [
  {
    name: "light",
    icon: Moon,
  },
  {
    name: "system",
    icon: Monitor,
  },
  {
    name: "dark",
    icon: Sun,
  },
];

const BUTTON_SIZE = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-10 h-10",
};

const CONTAINER_SIZE = {
  sm: "h-8",
  md: "h-10",
  lg: "h-12",
};

const ICON_SIZE = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export type ThemeSwitcherProps = {
  size?: "sm" | "md" | "lg";
  activeClassName?: string;
  className?: string;
};

export const ThemeSwitcher: FC<ThemeSwitcherProps> = (props) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { size = "md", activeClassName = "bg-black/8 dark:bg-white/10" } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 主题切换动画函数
  const handleThemeChange = (newTheme: string, event: React.MouseEvent) => {
    // 防御性判断：SSR 或不支持 View Transition 时直接切换主题
    if (typeof document === "undefined") {
      setTheme(newTheme);
      return;
    }
    const doc = document as DocumentWithViewTransition;
    if (!doc.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    // 获取点击位置（视口坐标）
    const cx = event.clientX;
    const cy = event.clientY;

    // 计算切换前后的暗色状态（考虑 system 模式）
    const prefersDark =
      typeof window !== "undefined" && "matchMedia" in window
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
        : false;
    const willBeDark = newTheme === "system" ? prefersDark : newTheme === "dark";

    // 开始视图过渡动画
    const transition = doc.startViewTransition(() => {
      // 确保主题切换的 DOM 变更在过渡回调内同步提交
      flushSync(() => setTheme(newTheme));
    });

    transition?.ready?.then(() => {
      // 计算到最远点的距离作为动画半径
      const endRadius = Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy));

      const clipPath = [`circle(0px at ${cx}px ${cy}px)`, `circle(${endRadius}px at ${cx}px ${cy}px)`];

      // 根据切换后的目标主题决定动画方向与作用对象
      const isDarkTarget = willBeDark;

      // 执行动画
      try {
        document.documentElement.animate(
          {
            clipPath: isDarkTarget ? [...clipPath].reverse() : clipPath,
          },
          {
            duration: 300,
            easing: "ease-out",
            pseudoElement: isDarkTarget ? "::view-transition-old(root)" : "::view-transition-new(root)",
            fill: "both",
          },
        );
      } catch {
        // 忽略动画异常，确保功能回退到无动画也能使用
      }
    });
  };

  return (
    <div
      className={classNames("flex items-center rounded-full border px-1", CONTAINER_SIZE[size], props.className)}
      key={`switcher-${mounted}`}
      ref={containerRef}
    >
      {themes.map((item) => {
        const Icon = item.icon;
        return (
          <div
            className={classNames(
              BUTTON_SIZE[size],
              "flex cursor-pointer items-center justify-center rounded-full",
              theme === item.name ? activeClassName : "",
            )}
            key={item.name}
            onClick={(event) => handleThemeChange(item.name, event)}
            suppressHydrationWarning={true}
          >
            <Icon className={ICON_SIZE[size]} />
          </div>
        );
      })}
    </div>
  );
};
