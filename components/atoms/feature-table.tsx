import React from 'react';
import { alpha, Typography, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box } from '@mui/system';

export type HeaderDataPoint = {
  key: string;
  name: string;
};

export type ContentDataPoint = {
  [key: string]: string;
};

export type FeatureTableProps = {
  header?: HeaderDataPoint[];
  content?: ContentDataPoint[];
  checkmarkText?: string;
  minWidth?: number;
};

const FeatureTable: React.FC<FeatureTableProps> = (props) => {
  const { header, content, checkmarkText = 'yes', minWidth = 900 } = props;

  const theme = useTheme();

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${header?.length ?? 1}, 1fr)`,
          gridGap: theme.spacing(2),
          p: theme.spacing(1.5),
          minWidth,
        }}
      >
        {header?.map((item, index) => (
          <Box key={item.key} sx={{ ...(index > 0 ? { textAlign: 'center' } : {}) }}>
            <Typography sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
          </Box>
        ))}
      </Box>
      {(content || []).map((line, index) => (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(${header?.length ?? 1}, 1fr)`,
            gridGap: theme.spacing(2),
            borderTop: `1px solid ${theme.palette.divider}`,
            p: theme.spacing(1.5),
            transition: theme.transitions.create(['background-color']),
            minWidth,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.light, 0.1),
            },
          }}
          key={index}
        >
          {(header || []).map((item, index) => (
            <Box
              sx={{
                ...(index > 0 ? { textAlign: 'center', justifyContent: 'center' } : {color: theme.palette.primary.main}),
                display: 'flex',
                alignItems: 'center',
              }}
              key={index}
            >
              {(line?.[item?.key] || '') === checkmarkText ? (
                <CheckCircleIcon color="secondary" />
              ) : (
                line?.[item?.key] || ''
              )}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default FeatureTable;
