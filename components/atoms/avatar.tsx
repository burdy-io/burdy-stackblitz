import { Avatar as MuiAvatar, AvatarProps as MuiAvatarProps, Grid, Typography } from '@mui/material';
import React, { useMemo } from 'react';

export type AvatarProps = {
  firstName?: string;
  lastName?: string;
  textClass?: string;
} & MuiAvatarProps;

const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }

  return color;
};

const stringAvatar = (name: string) => ({
  sx: {
    bgcolor: stringToColor(name),
  },
  children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
});

const Avatar: React.FC<AvatarProps> = (props) => {
  const { firstName, lastName, src, textClass, ...rest } = props;
  const hasName = useMemo(() => firstName || lastName, [firstName, lastName]);
  const nameAvatar = useMemo(() => !src && hasName, [src, hasName]);

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={1}>
      <Grid item>
        <MuiAvatar {...(nameAvatar ? stringAvatar(`${firstName || ''} ${lastName || ''}`) : {})} src={src} {...rest} />
      </Grid>
      {hasName && (
        <Grid item>
          <Typography sx={{ opacity: 0.7 }}>
            {firstName || ''} {lastName || ''}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Avatar;
