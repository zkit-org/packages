import { type FC, type ReactNode, useMemo, useState } from "react";
import classNames from "classnames";
import { ChevronDownIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Action, DropdownMenu, DropdownMenuTrigger } from "@easykit/design";
import { Profile } from "./profile";

export type NavItemConfig = {
  id: string;
  title: string;
  component?: ReactNode;
  href?: string;
};

export const useNavs = (): NavItemConfig[] => {
  const { t } = useTranslation();
  return [
    {
      id: "profile",
      title: t("账号"),
      component: <Profile />,
    },
  ];
};

export type NavItemProps = {
  config: NavItemConfig;
  active?: string;
};

export const NavItem: FC<NavItemProps> = (props) => {
  const { config, active } = props;
  const [open, setOpen] = useState(false);
  return (
    <li>
      <DropdownMenu onOpenChange={setOpen} open={open}>
        <DropdownMenuTrigger asChild>
          <Action
            active={config.id === active}
            className="!py-1 !outline-none space-x-1 dark:text-white dark:hover:text-white"
          >
            <span>{config.title}</span>
            <ChevronDownIcon className={classNames("size-4", open ? "rotate-180" : "")} />
          </Action>
        </DropdownMenuTrigger>
        <div onClick={() => setOpen(false)}>{config.component}</div>
      </DropdownMenu>
    </li>
  );
};

export type MenusProps = {
  active?: string;
};

export const Menus = (props: MenusProps) => {
  const { active } = props;
  const navs = useNavs();
  const items = useMemo(() => {
    return navs.map((value) => <NavItem active={active} config={value} key={value.id} />);
  }, [active]);
  return <ul className="flex space-x-2">{items}</ul>;
};
