import type { DetailedHTMLProps, FC, ImgHTMLAttributes } from 'react';
import styled from 'styled-components';

export interface CatImageProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  src: string;
}

const Div = styled.div`
  height: 600px;
`;

const Image = styled.img`
  width: 100%;
  height: 600px;
  object-fit: cover;
`;

const CatImage: FC<CatImageProps> = (catImageProps) => {
  return (
    <Div>
      <Image {...catImageProps} />
    </Div>
  );
};

export default CatImage;
