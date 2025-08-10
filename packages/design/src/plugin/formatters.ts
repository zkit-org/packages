import {register} from "@easykit/design";

register({
  // biome-ignore lint/suspicious/noExplicitAny: <join>
  join: (v: any[], s = '|') => {
    return v.join(s)
  },
})
