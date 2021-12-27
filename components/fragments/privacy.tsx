import React, { useState } from 'react';
import clsx from 'clsx';
import { Box, Button, ButtonProps, Container, Typography, useTheme } from '@mui/material';
import { ActionsGroup } from '../atoms';
import { styled } from '@mui/material/styles';

const PrivacyRootStyled = styled('div')(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  color: theme.palette.common.white,
  display: 'flex',
  flexDirection: 'row',
  '&.primary': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
  '&.secondary': {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.secondary.contrastText,
  },
}));

export type PrivacyProps = {
  title?: string;
  description?: string;
  appearance?: 'normal' | 'primary' | 'secondary';
  secondaryAction?: ButtonProps;
  primaryActionTitle?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Privacy: React.FC<PrivacyProps> = (props): JSX.Element | null => {
  const {
    title = '',
    description = '',
    secondaryAction,
    primaryActionTitle = '',
    appearance,
    className,
    ...rest
  } = props;

  const theme = useTheme();

  const [accepted, setAccepted] = useState<boolean>(() => {
    if (typeof window !== 'object') {
      return true;
    }

    if (localStorage?.getItem?.('privacy_accepted') === 'true') {
      return true;
    }
    return false;
  });

  const acceptPrivacy = () => {
    localStorage?.setItem?.('privacy_accepted', 'true');
    setAccepted(true);
  };

  return !accepted ? (
    <PrivacyRootStyled className={clsx([appearance || 'primary'])} {...rest}>
      <Container
        maxWidth="lg"
        sx={{
          display: 'grid',
          gap: theme.spacing(2),
          alignItems: 'center',
          gridAutoFlow: 'column',
          [theme.breakpoints.down('sm')]: {
            gridAutoFlow: 'row',
          },
        }}
      >
        <Box>
          {title?.length > 0 && (
            <Typography variant={'h6'} component={'span'}>
              {title}
            </Typography>
          )}
          {description?.length > 0 && <Typography variant="body2">{description}</Typography>}
        </Box>
        <ActionsGroup>
          {secondaryAction && (
            <Button color={'inherit'} variant={'outlined'} {...secondaryAction}>
              {secondaryAction?.title}
            </Button>
          )}
          <Button color={'secondary'} variant={'contained'} onClick={() => acceptPrivacy()}>
            {primaryActionTitle?.length > 0 ? primaryActionTitle : 'I Agree'}
          </Button>
        </ActionsGroup>
      </Container>
    </PrivacyRootStyled>
  ) : null;
};

export default Privacy;
