import {register} from "@easykit/design";

register({
    join: (v: any[], s = "|") => {
        return v.join(s);
    }
})
