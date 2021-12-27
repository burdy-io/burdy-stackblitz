import { IBurdyImage } from '../../types/burdy-cms';
import React from 'react';
import { styled } from '@mui/material';

export type ImageProps = {
  size?: 25 | 50 | 75 | 100 | 'auto';
} & IBurdyImage &
  React.HTMLAttributes<HTMLImageElement>;

const StyledImage = styled('img')(() => ({
  maxWidth: '100%',
}));

const Image: React.VoidFunctionComponent<ImageProps> = (props) => {
  const { size = 'auto', width, height, ...rest } = props;

  return (
    <StyledImage
      width={Number.parseFloat(width as any) || ''}
      height={Number.parseFloat(height as any) || ''}
      sx={{
        width: size === 'auto' ? undefined : `${size ?? 100}%`,
        height: size === 'auto' ? 'initial' : 'auto',
        aspectRatio: (Number.parseFloat(width as any) / Number.parseFloat(height as any) || '').toString(),
      }}
      {...rest}
    />
  );
};

export default Image;
