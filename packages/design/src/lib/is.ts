const opt = Object.prototype.toString;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function isObject(obj: any): obj is { [key: string]: any } {
  return opt.call(obj) === '[object Object]'
}
