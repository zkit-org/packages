import type { NextRequest } from "next/server";

import { middlewareHandler } from "@/plugin/middleware";

export async function middleware(request: NextRequest) {
  return await middlewareHandler(request);
}

export const config = {
  matcher: ["/((?!api|assets|favicon|site.web|android-chrome|apple-touch-icon).*)"],
};
