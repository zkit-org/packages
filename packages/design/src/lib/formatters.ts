import day from 'dayjs';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const time = (v: any, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!v) return '--';
  const d = day(v);
  return d.isValid() ? d.format(format) : '--';
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const defaultValue = (v: any) => {
  return v === 0 ? v : v || '--'
}
