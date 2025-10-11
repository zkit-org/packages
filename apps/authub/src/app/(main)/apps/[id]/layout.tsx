import type { FC, PropsWithChildren } from "react";
export type LayoutProps = PropsWithChildren;

const Layout: FC<LayoutProps> = async (props) => {
  return <div> apps layout{props.children}</div>;
};

export default Layout;
