"use client";

import { LayoutGrid, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

import { CountCard } from "./count-card";

export const HomePage = () => {
  const { t } = useTranslation();
  return (
    <div className="container py-md">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CountCard icon={<LayoutGrid className="size-10" />} title={t("应用")} value={"100"} />
        <CountCard icon={<Users className="size-10" />} title={t("用户")} value={"100"} />
      </div>
    </div>
  );
};
