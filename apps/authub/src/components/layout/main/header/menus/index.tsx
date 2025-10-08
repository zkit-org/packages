import { type FC, type ReactNode, useMemo, useState } from "react";
import classNames from "classnames";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Action, DropdownMenu, DropdownMenuTrigger, Separator } from "@easykit/design";
import { Profile } from "./profile";

export type NavItemConfig = {
  id: string;
  title?: string;
  component?: ReactNode;
  href?: string;
  type?: "link" | "dropdown" | "separator";
};

export const useNavs = (): NavItemConfig[] => {
  const { t } = useTranslation();
  return [
    {
      id: "apps",
      title: t("应用"),
      href: "/apps",
      type: "link",
    },
    {
      id: "users",
      title: t("用户"),
      href: "/users",
      type: "link",
    },
    {
      id: "separator",
      type: "separator",
    },
    {
      id: "profile",
      title: t("我的账号"),
      component: <Profile />,
      type: "dropdown",
    },
  ];
};

export type NavItemProps = {
  config: NavItemConfig;
  active?: string;
};

export const NavItem: FC<NavItemProps> = (props) => {
  const { config, active } = props;
  const { id, type, title, component, href } = config;
  const [open, setOpen] = useState(false);

  const action = useMemo(() => {
    return (
      <Action active={id === active} className="!py-1 !outline-none space-x-1 dark:text-white dark:hover:text-white">
        <span>{title}</span>
        {type === "dropdown" && <ChevronDownIcon className={classNames("size-4", open ? "rotate-180" : "")} />}
      </Action>
    );
  }, [id, type, title, active, open]);

  const menu = useMemo(() => {
    if (type === "dropdown") {
      return (
        <DropdownMenu onOpenChange={setOpen} open={open}>
          <DropdownMenuTrigger asChild>{action}</DropdownMenuTrigger>
          <div onClick={() => setOpen(false)}>{component}</div>
        </DropdownMenu>
      );
    } else if (type === "link" && href) {
      return <Link href={href}>{action}</Link>;
    } else if (type === "separator") {
      return (
        <div className="h-6">
          <Separator orientation="vertical" />
        </div>
      );
    }
  }, [type, action, component, open, setOpen, href, id]);

  return <li className="flex items-center">{menu}</li>;
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
  return <ul className="flex gap-2">{items}</ul>;
};
