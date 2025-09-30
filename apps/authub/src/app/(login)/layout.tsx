import type { FC, PropsWithChildren } from 'react'

import { LoginLayout } from '@/components/layout/login'

const Layout: FC<PropsWithChildren> = (props) => <LoginLayout {...props} />
export default Layout
