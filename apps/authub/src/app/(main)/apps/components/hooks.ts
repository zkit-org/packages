import { useQueryClient } from "@tanstack/react-query";

export const useAppsReload = () => {
  const client = useQueryClient();
  return () => {
    client.invalidateQueries({ queryKey: ["apps"] });
  };
};
