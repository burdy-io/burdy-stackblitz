import React from 'react';
import clsx from 'clsx';
import { Chip, Container, Typography, useTheme } from '@mui/material';
import { Link, LinkProps } from '../atoms';
import { styled } from '@mui/material/styles';

const AnnouncementRootStyled = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  '&.primary': {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
  '&.secondary': {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.secondary.contrastText,
  },
}));

export type AnnouncementSectionProps = {
  title?: string;
  caption?: string;
  appearance?: 'normal' | 'primary' | 'secondary';
  primaryAction?: LinkProps;
} & React.HTMLAttributes<HTMLDivElement>;

const AnnouncementSection: React.FC<AnnouncementSectionProps> = (props) => {
  const { title = '', caption = '', primaryAction, appearance, className, ...rest } = props;

  const theme = useTheme();

  return (
    <AnnouncementRootStyled {...rest} className={clsx([className, appearance])}>
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {caption && (
          <Chip
            sx={{
              fontWeight: theme.typography.fontWeightBold,
              mr: 2,
            }}
            color={'secondary'}
            label={caption}
          />
        )}
        {title?.length > 0 && (
          <Typography variant="body2">
            {title}{' '}
            {primaryAction && (
              <Typography component="span" variant="body2">
                <Link {...primaryAction}>{primaryAction?.title}</Link>
              </Typography>
            )}{' '}
          </Typography>
        )}
      </Container>
    </AnnouncementRootStyled>
  );
};

export default AnnouncementSection;
