import type { FC, ImgHTMLAttributes } from "react";

export type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

export const Image: FC<ImageProps> = (props) => {
  const { height, width, className } = props;

  return (
    <div className={className} style={{ height, width }}>
      <img alt={props.alt} className="h-full w-full" src={props.src} />
    </div>
  );
};
