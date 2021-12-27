import React from 'react';
import { Box, BoxProps } from '@mui/system';
import { SvgIconProps, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export type CheckListProps = {
  columns?: number;
  list?: {
    paragraph?: JSX.Element | string;
    icon?: SvgIconProps;
  }[];
} & BoxProps;

const CheckList: React.FC<CheckListProps> = (props) => {
  const { list, columns, ...rest } = props;

  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'grid',
        gridGap: theme.spacing(1),
        alignItems: 'center',
        gridTemplateColumns: `repeat(${columns ?? 1}, 1fr)`,
      }}
      {...rest}
    >
      {(list || []).map(({ paragraph, icon }, index) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }} key={index}>
          <CheckCircleIcon color="primary" {...icon} />
          <Box sx={{ marginLeft: theme.spacing(1) }} component="span">
            {paragraph}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CheckList;
