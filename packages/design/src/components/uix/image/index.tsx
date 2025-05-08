/* eslint-disable @next/next/no-img-element */
import {ImgHTMLAttributes, FC} from "react";

export type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

export const Image: FC<ImageProps> = (props) => {
  const {
    height,
    width,
    className
  } = props;

  return <div style={{height, width}} className={className}>
    <img className={"w-full h-full"} src={props.src} alt={props.alt}/>
  </div>
};
