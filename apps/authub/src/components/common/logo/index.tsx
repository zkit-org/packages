import { type PropsWithChildren, useMemo } from "react";
import classNames from "classnames";

export type LogoType = "normal" | "light" | "dark";

interface LogoProps extends PropsWithChildren {
  size?: number;
  className?: string;
  iconClassName?: string;
}

const Logo = (props: LogoProps) => {
  const { size = 32, className, iconClassName } = props;

  const margin = useMemo(() => Math.floor(size * 0.1), [size]);
  const imageSize = useMemo(() => size - margin * 2, [size, margin]);

  return (
    <div className={classNames("flex items-center justify-center rounded-sm", className)}>
      <div
        className={classNames(
          "bg-[url(@/assets/image/logo/light.png)] dark:bg-[url(@/assets/image/logo/dark.png)]",
          "bg-center bg-contain bg-no-repeat",
          iconClassName,
        )}
        style={{
          width: imageSize,
          height: imageSize,
          margin,
        }}
      />
    </div>
  );
};

export default Logo;
