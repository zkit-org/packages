import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 简单的MD5实现（用于生成存储key）
export function md5Hash(text: string): string {
  // 简化版MD5哈希算法
  let hash = 0
  if (text.length === 0) return hash.toString()

  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash &= hash // 转换为32位整数
  }

  // 转换为16进制并确保长度
  return Math.abs(hash).toString(16).padStart(8, '0')
}

// 生成DataTable列配置的存储key
export function generateColumnStorageKey(
  columns: Array<{ accessorKey?: string | number | symbol; id?: string }>
): string {
  const keys = columns
    .map((col) => {
      const accessorKey = col.accessorKey ? String(col.accessorKey) : ''
      const id = col.id || ''
      return accessorKey || id
    })
    .filter((key) => key)
    .sort()
    .join(',')

  return md5Hash(keys)
}
