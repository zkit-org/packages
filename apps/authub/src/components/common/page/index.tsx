import type { FC, PropsWithChildren } from "react";
import classNames from "classnames";

export type PageProps = PropsWithChildren<{
  className?: string;
}>;

export const Page: FC<PageProps> = (props) => {
  return <div className={classNames("flex flex-col gap-lg py-lg", props.className)}>{props.children}</div>;
};

export const MainPage = Page;
