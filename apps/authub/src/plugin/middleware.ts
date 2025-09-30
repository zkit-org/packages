import type { NextRequest } from 'next/server'

export const middlewareHandler = async (request: NextRequest) => {
  const { pathname } = request.nextUrl
  // Pass the original URL to the redirected page
  const url = new URL(request.url)
  const origin = url.origin
  request.headers.append('next-url', request.url)
  request.headers.append('next-origin', origin)
  request.headers.append('next-pathname', pathname) 

  // Check if there is any supported locale in the pathname
  // const pathnameHasLocale = locales.some(
  //     (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  // )
  // if (pathnameHasLocale) return

  // Redirect if there is no locale
  // const locale = getLocale(request)
  // request.nextUrl.pathname = `/${locale}${pathname}`

  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  // return NextResponse.redirect(request.nextUrl)
}
