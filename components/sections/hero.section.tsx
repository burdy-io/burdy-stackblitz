import React, { useMemo } from 'react';
import { ImageProps, Image, ActionsGroup } from '../atoms';
import { alpha, Box, Button, ButtonProps, styled, Theme, Typography } from '@mui/material';
import { SxProps } from '@mui/system';

export type HeroProps = {
  title?: string;
  description?: string;
  image?: ImageProps;
  backgroundColor?: string;
  curve?: boolean;
  primaryAction?: ButtonProps;
  secondaryAction?: ButtonProps;
  imageSx?: SxProps<Theme>;
};

const HeroImage = styled(Image)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
  display: 'block',
  objectFit: 'cover',
  zIndex: 2,
  filter: 'brightness(0.5)',
}));

const HeroImageDecorator = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.dark, 0.15),
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 3,
}));

const HeroWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '60vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4, 1),
  clipPath: 'ellipse(150% 70% at 50% 30%)',
  overflow: 'hidden',
}));

const HeroContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  position: 'relative',
  zIndex: 5,
  color: theme.palette.common.white,
}));

const HeroActions = styled(ActionsGroup)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const HeroSection: React.FC<HeroProps> = (props) => {
  const { title, description, image, primaryAction, secondaryAction, imageSx, ...rest } = props;

  const hasAction = useMemo(() => primaryAction || secondaryAction, [primaryAction, secondaryAction]);

  return (
    <HeroWrapper {...rest}>
      {image && (
        <>
          <HeroImage sx={imageSx} {...image} />
          <HeroImageDecorator />
        </>
      )}
      <HeroContainer>
        {title && <Typography variant="h1">{title}</Typography>}
        {description && <Typography variant="h5">{description}</Typography>}
        {hasAction && (
          <HeroActions>
            {primaryAction && (
              <Button color={'primary'} variant={'contained'} size="large" {...primaryAction}>
                {primaryAction?.title}
              </Button>
            )}
            {secondaryAction && (
              <Button color={'inherit'} variant={'outlined'} size="large" {...secondaryAction}>
                {secondaryAction?.title}
              </Button>
            )}
          </HeroActions>
        )}
      </HeroContainer>
    </HeroWrapper>
  );
};

export default HeroSection;
