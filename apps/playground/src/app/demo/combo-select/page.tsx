'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { debounce } from 'lodash'
import { ComboSelect } from '@easykit/design'

const Page = () => {
  // biome-ignore lint/suspicious/noExplicitAny: <result>
  const [result, setResult] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [value, setValue] = useState<string[]>(['1001'])
  const [initLoading, setInitLoading] = useState<boolean>(true)

  const onSearch = useCallback(
    debounce(async (value: string) => {
      console.log('onSearch', value)
      const r = await fetch('/api/select').then((r) => r.json())
      setLoading(false)
      setResult(r)
    }, 500),
    []
  )

  useEffect(() => {
    setTimeout(() => {
      setInitLoading(false)
    }, 1000)
  }, [])

  const options = useMemo(() => {
    return result
  }, [result])

  return (
    <div className="p-4">
      <ComboSelect<{ label: string; value: string }>
        className="w-[220px]"
        filter={(value, search, option) => {
          console.log('filter', value, search, option)
          return (option?.label as string)?.includes(search) || value.includes(search)
        }}
        initLoading={initLoading}
        loading={loading}
        multiple={true}
        onChange={(value) => {
          setValue(value as string[])
        }}
        onSearch={(value) => {
          setLoading(true)
          setResult([])
          onSearch(value)
        }}
        options={options}
        placeholder="请选择"
        search={true}
        value={value}
      />
    </div>
  )
}

export default Page
