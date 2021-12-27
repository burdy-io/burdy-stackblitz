import React, { FC } from 'react';
import { alpha, Box, Container, ContainerProps, styled, useTheme } from '@mui/material';
import { cleanObject, getNonEmpty } from '../../utils/object.utils';
import { Image } from '../atoms';
import { componentMapper } from '../componentMapper';

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

const LayoutRootStyled = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
}));

const buildPadding = (padding, paddingPosition, theme) => {
  const innerPadding = parseInt(padding, 10);
  if (Number.isNaN(innerPadding)) return {};
  switch (paddingPosition) {
    case 'top':
      return {
        paddingTop: theme.spacing(innerPadding),
      };
      break;
    case 'bottom':
      return {
        paddingBottom: theme.spacing(innerPadding),
      };
      break;
    case 'left':
      return {
        paddingLeft: theme.spacing(innerPadding),
      };
      break;
    case 'right':
      return {
        paddingRight: theme.spacing(innerPadding),
      };
      break;
    case 'all':
      return {
        padding: theme.spacing(innerPadding),
      };
    case 'left-right':
      return {
        padding: theme.spacing(0, innerPadding),
      };
    default:
      return {
        padding: theme.spacing(innerPadding, 0),
      };
  }
};

export type LayoutProps = {
  template?: string;
  tabletTemplate?: string;
  mobileTemplate?: string;
  gap?: string | number;
  padding?: string | number;
  paddingPosition?: 'all' | 'top' | 'bottom' | 'left' | 'right' | 'top-bottom' | 'left-right';
  verticalAlign?: 'center' | 'flex-start' | 'flex-end';
  backgroundImage?: any;
  clipPath?: boolean;
  background?: any;
  color?: any;
  components?: any[];
} & ContainerProps;

const LayoutSection: FC<LayoutProps> = (props) => {
  const {
    template,
    tabletTemplate,
    mobileTemplate,
    gap,
    children,
    padding,
    paddingPosition,
    backgroundImage,
    background,
    clipPath,
    color,
    verticalAlign = 'flex-start',
    components,
    ...rest
  } = props;

  const theme = useTheme();

  const innerDesktopTemplate = getNonEmpty(template) || '1fr';
  const innerTabletTemplate = getNonEmpty(tabletTemplate) || innerDesktopTemplate;
  const innerMobileTemplate = getNonEmpty(mobileTemplate) || innerTabletTemplate;

  const innerPadding = buildPadding(padding, paddingPosition, theme);

  let innerGap = parseInt(gap as string, 10);
  if (Number.isNaN(innerGap)) {
    innerGap = 4;
  }

  const renderComponents = () => {
    return components?.map(componentMapper);
  };

  return (
    <LayoutRootStyled
      sx={{
        ...cleanObject({
          background,
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
      <Container {...rest}>
        <Box
          display="grid"
          sx={{
            ...innerPadding,
            gridTemplateColumns: innerDesktopTemplate,
            [theme.breakpoints.down('md')]: {
              gridTemplateColumns: innerTabletTemplate,
            },
            [theme.breakpoints.down('sm')]: {
              gridTemplateColumns: innerMobileTemplate,
            },
            position: 'relative',
            zIndex: 5,
            alignItems: verticalAlign,
            gap: theme.spacing(innerGap),
          }}
        >
          {(components || [])?.length > 0 ? renderComponents() : children}
        </Box>
      </Container>
    </LayoutRootStyled>
  );
};

export default LayoutSection;
