import { FC } from 'react';
import { Container, useTheme } from '@mui/material';
import { ClipboardContentProps, ClipboardContent } from '../atoms';

export type ClipboardSectionProps = ClipboardContentProps;

const ClipboardSection: FC<ClipboardSectionProps> = (props) => {
  const theme = useTheme();

  return (
    <Container
      maxWidth="lg"
      sx={{
        justifyContent: 'center',
        textAlign: 'left',
        paddingBottom: theme.spacing(5),
        [theme.breakpoints.down('md')]: {
          display: 'none',
        },
      }}
    >
      <ClipboardContent {...props} />
    </Container>
  );
};

export default ClipboardSection;
