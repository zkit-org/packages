import day from "dayjs";

// biome-ignore lint/suspicious/noExplicitAny: <v>
export const time = (v: any, format = "YYYY-MM-DD HH:mm:ss") => {
  if (!v) return "--";
  const d = day(v);
  return d.isValid() ? d.format(format) : "--";
};

// biome-ignore lint/suspicious/noExplicitAny: <v>
export const defaultValue = (v: any) => {
  return v === 0 ? v : v || "--";
};
