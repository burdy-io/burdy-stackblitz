import React from 'react';
import Link, { LinkProps } from './link';
import Image, { ImageProps } from './image';
import { Button, Container, Paper, PaperProps, styled, Typography, useTheme } from '@mui/material';

const ShowcaseCardWrapper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
  boxShadow: theme.shadows[16],
  transition: theme.transitions.create(['box-shadow']),
  position: 'relative',
  paddingBottom: '100%',
  '&:hover': {
    boxShadow: theme.shadows[18],
  },
  '&:hover .image': {
    transform: 'scale(1.2)',
  },
}));

const ShowcaseCardImage = styled(Image)(({ theme }) => ({
  display: 'block',
  height: '100%',
  width: '100%',
  objectFit: 'cover',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  transition: theme.transitions.create(['transform'], { duration: 700 }),
}));

const ShowcaseCardContent = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  color: theme.palette.common.white,
  paddingBottom: theme.spacing(2),
}));

export type ShowcaseCardProps = {
  title?: string;
  subtitle?: string;
  link?: LinkProps;
  image?: ImageProps;
} & PaperProps;

const ShowcaseCard: React.FC<ShowcaseCardProps> = (props) => {
  const { title, subtitle, link, image, ...rest } = props;

  const theme = useTheme();

  return (
    <ShowcaseCardWrapper {...rest}>
      {image && <ShowcaseCardImage className={'image'} {...image} />}
      <ShowcaseCardContent>
        <Container>
          {title && (
            <Typography sx={{ fontWeight: 'bold' }} variant="h4">
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography sx={{ fontWeight: 'bold' }} variant="h6">
              {subtitle}
            </Typography>
          )}
          {link &&
            (() => {
              const { title, ...linkRest } = link;

              return (
                <Link {...linkRest}>
                  <Button
                    sx={{
                      marginTop: theme.spacing(1),
                      padding: theme.spacing(1, 3),
                    }}
                    color={'primary'}
                    variant={'contained'}
                  >
                    {title}
                  </Button>
                </Link>
              );
            })()}
        </Container>
      </ShowcaseCardContent>
    </ShowcaseCardWrapper>
  );
};

export default ShowcaseCard;
