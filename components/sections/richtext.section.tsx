import React  from 'react';
import { Container, styled } from '@mui/material';
import { Breakpoint } from '@mui/system';
import { RichText } from '@burdy-cms/react-utils';
import 'prismjs/themes/prism-tomorrow.css';

const RichtextStyled = styled(RichText)(({ theme }) => ({
  color: '#444',
  padding: theme.spacing(2),
  'b, strong': { fontWeight: theme.typography.fontWeightBold },
  figure: { maxWidth: '100%' },
  figcaption: {
    textAlign: 'center',
    fontSize: '14px',
    color: 'rgba(117, 117, 117, 1)',
  },
  blockquote: {
    ...theme.typography.body2,
    borderLeft: `5px solid ${theme.palette.primary.main}`,
    fontStyle: 'italic',
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.primary['50']
  },
  pre: {
    backgroundColor: '#2d2d2d',
    color: '#ccc',
    overflowWrap: 'normal',
    wordBreak: 'normal',
    marginBottom: '10px',
    padding: '1rem',
    fontSize: '.8rem',
    overflowX: 'auto',
    whiteSpace: 'initial',
    maxWidth: '100%',
  },
  '& li': {
    padding: '0 !important',
    margin: '0 !important',
  },
  '& :not(pre) > code[class*="language-"], & pre[class*="language-"]': {
    backgroundColor: '#2d2d2d !important',
  },
  '& code[class*="language-"], & pre[class*="language-"]': {
    backgroundColor: '#2d2d2d !important',
  },
  'pre > pre': {
    margin: '0 !important',
    padding: '0 !important',
    overflow: 'hidden !important',
    whiteSpace: 'pre !important',
  },
  code: {
    borderRadius: '3px',
    marginBottom: '10px',
  },
  '@media print': {
    '*, *:before, *:after': {
      background: 'transparent !important',
      color: '#000 !important',
      boxShadow: 'none !important',
      textShadow: 'none !important',
    },
    'a, a:visited': { textDecoration: 'underline' },
    'a[href]:after': { content: '" (" attr(href) ")"' },
    'abbr[title]:after': { content: '" (" attr(title) ")"' },
    'a[href^="#"]:after, a[href^="javascript:"]:after': {
      content: '""',
    },
    'pre, blockquote': { pageBreakInside: 'avoid' },
    img: { pageBreakInside: 'avoid' },
    'p, h2, h3': { orphans: 3, widows: 3 },
    'h2, h3': { pageBreakAfter: 'avoid' },
  },
  p: {
    ...theme.typography.body1,
  },
  h1: {
    ...theme.typography.h1,
    marginTop: '0',
    paddingBottom: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  h2: {
    ...theme.typography.h2,
    paddingBottom: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  h3: {
    ...theme.typography.h3,
    paddingBottom: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  h4: { ...theme.typography.h4 },
  h5: { ...theme.typography.h5 },
  h6: { ...theme.typography.h6 },
  small: { ...theme.typography.body2 },
  'img, canvas, iframe, video, svg, select, textarea': {
    maxWidth: '100%',
  },
  'p, *:not(div):not(img):not(body):not(html):not(li):not(blockquote):not(p)': {
    margin: '1rem auto 1rem',
  },
  div: { width: '100%' },
  img: {
    maxWidth: 'minmax(720px, 100%)',
    maxHeight: 360,
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
    boxShadow: '0 1.6px 3.6px 0 rgb(0 0 0 / 13%), 0 0.3px 0.9px 0 rgb(0 0 0 / 11%)',
    borderRadius: 12,
  },
  '& figure': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  li: { marginLeft: '2rem' },
  'a, a:visited': { color: '#3498db' },
  'a:hover, a:focus, a:active': { color: '#2980b9' },
}));

export type RichtextProps = {
  content?: string;
  maxWidth?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const RichtextSection: React.FC<RichtextProps> = ({ content, maxWidth = '' }) => {
  if (maxWidth?.length > 0 && maxWidth !== 'none') {
    return (
      <Container maxWidth={maxWidth as Breakpoint}>
        <RichtextStyled richText={content} />
      </Container>
    );
  }
  return <RichtextStyled richText={content} />;
};

export default RichtextSection;
