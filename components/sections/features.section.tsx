import React, { FC, useMemo } from 'react';
import {
  alpha,
  Box,
  Button,
  ButtonProps,
  Container,
  ContainerProps,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { cleanObject } from '../../utils/object.utils';
import { Image, ImageProps } from '../atoms';

const FeatureRootStyled = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  alignItems: 'center',
  textAlign: 'center',
  '& > .feature-image': {
    marginBottom: theme.spacing(1),
  },
}));

export type FeatureProps = {
  title?: string;
  caption?: string;
  description?: string;
  image?: ImageProps;
  primaryAction?: ButtonProps;
  align?: 'left' | 'center' | 'right';
  mobileAlign?: 'left' | 'center' | 'right';
} & React.HTMLAttributes<HTMLDivElement>;

const Feature: FC<FeatureProps> = (props) => {
  const { title = '', caption = '', description = '', image, primaryAction, children, ...rest } = props;

  const hasActions = useMemo(() => primaryAction, [primaryAction]);

  return (
    <FeatureRootStyled {...rest}>
      {image && <Image {...image} className="feature-image" size="auto" />}
      {title?.length > 0 && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      {description?.length > 0 && (
        <Typography variant={'body2'} gutterBottom>
          {description}
        </Typography>
      )}
      {hasActions && (
        <Button {...cleanObject(primaryAction)} variant={'contained'} size={'large'}>
          {primaryAction?.title}
        </Button>
      )}
    </FeatureRootStyled>
  );
};

const BackgroundImageStyled = styled(Image)(() => ({
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

const BackgroundImageDecoratorStyled = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.dark, 0.15),
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 3,
}));

const FeaturesSectionRootStyled = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
}));

export type FeaturesSectionProps = {
  title?: string;
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  description?: string;
  caption?: string;

  features?: FeatureProps[];

  backgroundImage?: any;
  clipPath?: boolean;
  backgroundColor?: any;
  color?: any;
} & ContainerProps;

const FeaturesSection: FC<FeaturesSectionProps> = (props) => {
  const {
    title = '',
    titleVariant = 'h3',
    description = '',
    caption = '',

    features = [],

    backgroundImage,
    backgroundColor,
    clipPath,
    color,
    maxWidth,
    ...rest
  } = props;

  const theme = useTheme();

  const innerTemplate = (features || [])?.length > 3 ? 'repeat(3, 1fr)' : `repeat(${features?.length}, 1fr)`;
  const innerTabletTemplate = (features || [])?.length > 2 ? 'repeat(2, 1fr)' : `repeat(${features?.length}, 1fr)`;
  const innerMobileTemplate = '1fr';

  return (
    <FeaturesSectionRootStyled
      sx={{
        ...cleanObject({
          backgroundColor,
          color,
          clipPath: clipPath ? 'ellipse(150% 70% at 50% 30%)' : null,
          overflow: clipPath ? 'hidden' : null,
        }),
      }}
    >
      {backgroundImage && (
        <>
          <BackgroundImageStyled {...backgroundImage} />
          <BackgroundImageDecoratorStyled />
        </>
      )}
      <Container {...rest} maxWidth={maxWidth}>
        <Box
          display="flex"
          sx={{
            flexDirection: 'column',
            position: 'relative',
            zIndex: 5,
            alignItems: 'center',
            textAlign: 'center',
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
            [theme.breakpoints.down('md')]: {
              gridTemplateColumns: '1fr',
              textAlign: 'center',
              flexDirection: 'column',
            },
            '& > *:not(:last-child)': {
              marginBottom: theme.spacing(4),
            },
          }}
        >
          <Box
            sx={{
              flex: 1,
            }}
          >
            {caption && (
              <Typography
                sx={{
                  textTransform: 'uppercase',
                  color: 'secondary.light',
                  fontWeight: 'bold',
                }}
                variant="body1"
                gutterBottom
              >
                {caption}
              </Typography>
            )}
            {title?.length > 0 && (
              <Typography gutterBottom variant={titleVariant} dangerouslySetInnerHTML={{ __html: title }} />
            )}
            {description && <Typography gutterBottom>{description}</Typography>}
          </Box>
          {features?.length > 0 && (
            <Box
              sx={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: innerTemplate,
                [theme.breakpoints.down('md')]: {
                  gridTemplateColumns: innerTabletTemplate,
                },
                [theme.breakpoints.down('sm')]: {
                  gridTemplateColumns: innerMobileTemplate,
                },
                gap: theme.spacing(2),
              }}
            >
              {features.map((feature, index) => {
                const { title, caption, description, primaryAction, image } = feature;
                if (image?.[0]) {
                  image[0].width = image[0].width || 60;
                  image[0].height = image[0].height || 60;
                }
                return (
                  <Feature
                    key={`${title}_${index}`}
                    title={title}
                    caption={caption}
                    description={description}
                    primaryAction={primaryAction}
                    image={image?.[0] || undefined}
                  />
                );
              })}
            </Box>
          )}
        </Box>
      </Container>
    </FeaturesSectionRootStyled>
  );
};

export default FeaturesSection;
