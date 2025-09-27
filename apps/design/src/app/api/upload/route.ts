export const dynamic = 'force-static'

export function POST() {
  return Response.json({
    code: 0,
    data: 'https://easykit.cn/api/upload/file/123.png',
    success: true,
  })
}
