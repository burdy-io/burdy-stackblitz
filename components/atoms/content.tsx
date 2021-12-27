import React, { FC, useMemo } from 'react';
import { Button, ButtonProps, Box, Typography, TypographyProps } from '@mui/material';
import clsx from 'clsx';
import { ActionsGroup } from './';
import Image, { ImageProps } from './image';
import { styled } from '@mui/material/styles';
import { cleanObject, cleanObjectPropTypes } from '../../utils/object.utils';

const ContentRootStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  '&.left': {
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  '&.center': {
    alignItems: 'center',
    textAlign: 'center',
  },
  '&.right': {
    alignItems: 'flex-end',
    textAlign: 'right',
  },
  '&.mobile-left': {
    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-start',
      textAlign: 'left',
    },
  },
  '&.mobile-center': {
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      textAlign: 'center',
    },
  },
  '&.mobile-right': {
    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-end',
      textAlign: 'right',
    },
  },
}));

export type ContentProps = {
  title?: string;
  titleHtml?: string;
  titleEl?: TypographyProps;
  caption?: string;
  description?: string;
  image?: ImageProps;
  primaryAction?: ButtonProps;
  secondaryAction?: ButtonProps;
  align?: 'left' | 'center' | 'right';
  mobileAlign?: 'left' | 'center' | 'right';
} & React.HTMLAttributes<HTMLDivElement>;

const Content: FC<ContentProps> = (props) => {
  const {
    title = '',
    titleHtml = '',
    titleEl,
    caption = '',
    description = '',
    image,
    primaryAction,
    secondaryAction,
    align = 'left',
    mobileAlign = 'left',
    className,
    children,
    ...rest
  } = props;

  const hasActions = useMemo(() => primaryAction || secondaryAction, [primaryAction, secondaryAction]);
  const innerTitle = useMemo<undefined | string | JSX.Element>(() => {
    const titleElLength = titleEl?.title?.length as number;
    if (!(title?.length > 0) && !(titleHtml?.length > 0) && !(titleElLength > 0)) return;
    if (titleHtml?.length > 0) return <span dangerouslySetInnerHTML={{ __html: titleHtml }} />;
    return titleElLength > 0 ? titleEl?.title : title;
  }, [title, titleEl, titleHtml]);

  return (
    <ContentRootStyled {...rest} className={clsx([className, align, mobileAlign && `mobile-${mobileAlign}`])}>
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
      {innerTitle && (
        <Typography variant="h3" gutterBottom {...cleanObjectPropTypes(titleEl)}>
          {innerTitle}
        </Typography>
      )}
      {image?.src && <Image {...image} />}
      {description && <Typography gutterBottom>{description}</Typography>}
      {hasActions && (
        <ActionsGroup>
          {primaryAction?.title && (
            <Button variant={'contained'} {...cleanObject(primaryAction)}>
              {primaryAction?.title}
            </Button>
          )}
          {secondaryAction?.title && (
            <Button variant={'outlined'} {...cleanObject(secondaryAction)}>
              {secondaryAction?.title}
            </Button>
          )}
        </ActionsGroup>
      )}
      {children}
    </ContentRootStyled>
  );
};

export default Content;
