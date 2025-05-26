import {register} from "@easykit/design";

register({
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  join: (v: any[], s = '|') => {
    return v.join(s)
  },
})
