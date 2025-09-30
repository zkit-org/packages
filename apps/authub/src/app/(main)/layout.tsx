import type { FC, PropsWithChildren } from "react";

import { MainLayout } from "@/components/layout/main";

const Layout: FC<PropsWithChildren> = (props) => <MainLayout {...props} />;
export default Layout;
