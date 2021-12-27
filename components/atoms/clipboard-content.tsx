import { Alert, Box, BoxProps, Snackbar, styled } from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import ContentCopy from '@mui/icons-material/ContentCopy';
import { useTheme } from '@mui/system';

export type ClipboardContentProps = {
  text?: string;
  successMessage?: string;
} & BoxProps;

const ClipboardWrapper = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.grey.A100,
  padding: theme.spacing(1.5, 3.5),
  borderRadius: theme.spacing(0.75),
  fontFamily: 'monospace',
  display: 'inline-flex',
  alignItems: 'center',
}));

const ClipboardContent: React.FC<ClipboardContentProps> = (props) => {
  const { text = '', successMessage = 'Copied to clipboard!', children, ...rest } = props;

  const theme = useTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const clickHandler = useCallback(() => {
    if (!text) return;

    (async () => {
      await window.navigator.clipboard.writeText(text);
      setSnackbarOpen(true);
    })();
  }, [text]);

  const closeHandler = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  return (
    <>
      <ClipboardWrapper {...rest}>
        <Box component="span">{children}</Box>
        <ContentCopy onClick={clickHandler} sx={{ marginLeft: theme.spacing(2), cursor: 'pointer' }} />
      </ClipboardWrapper>
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        autoHideDuration={4000}
        onClose={closeHandler}
      >
        <Alert severity="success" onClose={closeHandler}>
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ClipboardContent;
