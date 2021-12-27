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
import { ActionsGroup, ImageProps, Image, Link, CheckList, CheckListProps } from '../atoms';

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

const ContentSectionRootStyled = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
}));

export type ContentSectionProps = {
  title?: string;
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  titleFontSize?: string;
  description?: string;
  caption?: string;

  image?: ImageProps;
  imagePosition?: 'left' | 'right';

  primaryAction?: ButtonProps;
  secondaryAction?: ButtonProps;

  backgroundImage?: any;
  clipPath?: boolean;
  backgroundColor?: any;
  color?: any;
  checkList?: CheckListProps;
} & ContainerProps;

const ContentSection: FC<ContentSectionProps> = (props) => {
  const {
    title = '',
    titleVariant = 'h3',
    titleFontSize,
    description = '',
    caption = '',
    image,
    imagePosition,
    primaryAction,
    secondaryAction,
    backgroundImage,
    backgroundColor,
    clipPath,
    color,
    maxWidth,
    checkList,
    ...rest
  } = props;

  const theme = useTheme();
  const hasActions = useMemo(() => primaryAction || secondaryAction, [primaryAction, secondaryAction]);

  return (
    <ContentSectionRootStyled
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
            flexDirection: imagePosition === 'left' ? 'row-reverse' : 'row',
            position: 'relative',
            zIndex: 5,
            alignItems: 'center',
            textAlign: image ? 'left' : 'center',
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
            '& > *:not(:last-child)': {
              marginRight: imagePosition === 'left' ? 0 : theme.spacing(4),
              marginLeft: imagePosition === 'left' ? theme.spacing(4) : 0,
            },
            [theme.breakpoints.down('md')]: {
              gridTemplateColumns: '1fr',
              textAlign: 'center',
              flexDirection: 'column',
              '& > *:not(:last-child)': {
                marginRight: 0,
                marginBottom: theme.spacing(4),
              },
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
              <Typography
                gutterBottom
                variant={titleVariant}
                dangerouslySetInnerHTML={{ __html: title }}
                sx={{
                  fontSize: (titleFontSize || '')?.length > 0 ? titleFontSize : theme.typography[titleVariant].fontSize,
                }}
              />
            )}
            {description && (
              <Typography gutterBottom marginBottom={theme.spacing(2)}>
                {description}
              </Typography>
            )}
            {checkList && <CheckList {...checkList} />}
            {hasActions && (
              <ActionsGroup>
                {primaryAction?.title && (
                  <Button component={Link} variant={'contained'} size="large" {...cleanObject(primaryAction)}>
                    {primaryAction?.title}
                  </Button>
                )}
                {secondaryAction?.title && (
                  <Button component={Link} variant={'outlined'} size="large" {...cleanObject(secondaryAction)}>
                    {secondaryAction?.title}
                  </Button>
                )}
              </ActionsGroup>
            )}
          </Box>
          {image && (
            <Box
              sx={{
                flex: 1,
              }}
            >
              <Image {...image} />
            </Box>
          )}
        </Box>
      </Container>
    </ContentSectionRootStyled>
  );
};

export default ContentSection;
