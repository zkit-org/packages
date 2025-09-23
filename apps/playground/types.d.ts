declare module '@arco-iconbox/react-atom-ui' {
  import type { FC } from 'react'
  export type IconProps = FC<{
    className?: string
    fontSize?: number
  }> 
  export const IconEmpty: IconProps;
  export const IconSpin: IconProps;
  export const IconH1: IconProps;
  export const IconH2: IconProps;
  export const IconNumberList: IconProps;
}
