import type { FC, ImgHTMLAttributes } from 'react'

export type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

export const Image: FC<ImageProps> = (props) => {
  const { height, width, className } = props

  return (
    <div style={{ height, width }} className={className}>
      {/* biome-ignore lint/nursery/noImgElement: <explanation> */}
      <img className="h-full w-full" src={props.src} alt={props.alt} />
    </div>
  )
};
