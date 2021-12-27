import Image, { ImageProps } from './image';
import Avatar, { AvatarProps } from './avatar';
import { Box, CardContent, Grid, Paper, PaperProps, styled, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/system/colorManipulator';
import React, { useMemo } from 'react';
import clsx from 'clsx';
import { format } from 'date-fns';

const MediaCardWrapper = styled(Paper)(({ theme }) => ({
  boxShadow: theme.shadows[16],
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
  transition: theme.transitions.create(['transform', 'box-shadow']),
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[18],
  },
  '&.wide': {
    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gridAutoFlow: 'column',
      gridTemplateColumns: '1fr 1fr',
      '& .title': {
        fontSize: theme.typography.h5.fontSize,
      },
    },
  },
}));

const MediaCardImage = styled(Image)(({ theme }) => ({
  height: 360,
  objectFit: 'cover',
  clipPath: 'ellipse(150% 80% at 16% 20%)',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    height: 300,
  },
  '&.wide': {
    [theme.breakpoints.up('md')]: {
      clipPath: 'ellipse(164% 290% at 164% 18%)',
      gridColumnStart: 2,
      gridColumnEnd: 2,
      height: '100%',
    },
  },
}));

const MediaCardContent = styled('div')(({ theme }) => ({
  '&.wide': {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: theme.spacing(1.5),
    },
  },
}));

export type MediaCardProps = {
  title?: string;
  description?: string;
  image?: ImageProps;
  avatar?: AvatarProps;
  createdAt?: Date;
  appearance?: 'narrow' | 'wide';
} & PaperProps;

const MediaCard: React.FC<MediaCardProps> = (props) => {
  const { title, description, image, avatar, createdAt, appearance, className, ...rest } = props;

  const theme = useTheme();
  const hasDetails = useMemo(() => avatar || createdAt, [avatar, createdAt]);

  return (
    <MediaCardWrapper className={clsx(appearance ?? 'narrow', className)} {...rest}>
      {image && <MediaCardImage className={clsx(appearance ?? 'narrow')} {...image} />}
      <MediaCardContent className={clsx(appearance ?? 'narrow')}>
        <CardContent>
          {title && (
            <Typography className="title" variant="h4" gutterBottom>
              {title}
            </Typography>
          )}
          {description && (
            <Typography variant="body1" sx={{ opacity: 0.7 }}>
              {description}
            </Typography>
          )}
        </CardContent>
        {hasDetails && (
          <CardContent
            sx={{
              paddingTop: 0,
              paddingBottom: `${theme.spacing(2)} !important`,
            }}
          >
            <Grid
              sx={{
                paddingTop: theme.spacing(2),
                borderTop: `1px solid ${alpha(theme.palette.common.black, 0.2)}`,
              }}
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                {avatar && (
                  <Avatar
                    sx={{
                      fontSize: theme.typography.body1.fontSize,
                      width: 38,
                      height: 38,
                    }}
                    {...avatar}
                  />
                )}
              </Grid>
              <Grid item>
                {createdAt && (
                  <Box component="span" sx={{ opacity: 0.7 }}>
                    {format(createdAt, 'd LLL yy')}
                  </Box>
                )}
              </Grid>
            </Grid>
          </CardContent>
        )}
      </MediaCardContent>
    </MediaCardWrapper>
  );
};

export default MediaCard;
