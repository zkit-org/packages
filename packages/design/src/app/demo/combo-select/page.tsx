'use client';

import {ComboSelect} from "@easykit/design";
import { debounce } from 'lodash'
import { useCallback, useMemo, useState } from 'react'

const Page = () => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [result, setResult] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const onSearch = useCallback(
    debounce(async (value: string) => {
      console.log('onSearch', value)
      const r = await fetch('/api/select').then((r) => r.json())
      setLoading(false)
      setResult(r)
    }, 500),
    []
  )

  const options = useMemo(() => {
    return result
  }, [result])

  return (
    <div className="p-4">
      <ComboSelect<{ label: string; value: string }>
        options={options}
        loading={loading}
        placeholder="请选择"
        multiple={true}
        className="w-[220px]"
        search={true}
        onSearch={(value) => {
          setLoading(true)
          setResult([])
          onSearch(value)
        }}
        filter={(value, search, option) => {
          console.log('filter', value, search, option)
          return (option?.label as string)?.includes(search) || value.includes(search)
        }}
      />
    </div>
  )
}

export default Page;
