'use client';

import {ComboSelect} from "@easykit/design";
import {useCallback, useMemo, useState} from "react";
import {debounce} from "lodash";

const Page = () => {
  const [result, setResult] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onSearch = useCallback(debounce(async (value: string) => {
    const r = await fetch("/api/select").then((r) => r.json());
    setLoading(false);
    setResult(r);
  }, 500), []);

  const options = useMemo(() => {
    return result;
  }, [result])

  return <div className={"p-4"}>
    <ComboSelect
      options={options}
      loading={loading}
      placeholder={"请选择"}
      multiple={true}
      className={"w-[200px]"}
      search={true}
      onSearch={(value) => {
        setLoading(true);
        setResult([]);
        onSearch(value);
      }}
    />
  </div>
}

export default Page;
