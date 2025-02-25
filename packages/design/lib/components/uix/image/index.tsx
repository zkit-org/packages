import {ImgHTMLAttributes, FC} from "react";

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
}

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
