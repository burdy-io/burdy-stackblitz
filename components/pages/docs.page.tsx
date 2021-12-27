import React, { useMemo, useState } from 'react';
import { Footer } from '../fragments';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '@mui/system';
import { Box, Container, IconButton, styled, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { BurdyPage, GetTemplateProps, IBurdyImage } from '../../types/burdy-cms';
import { FooterProps } from '../fragments';
import { cmsRewrites } from '../../common/rewrites';
import { useRouter } from 'next/router';
import { Link, Image, ListProps, List } from '../atoms';
import { RichtextSection } from '../sections';
import { getPost } from '../../common/burdy-api';
import { usePreview } from '@burdy-cms/react-utils';

const drawerWidth = 240;

const DocsContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: `${drawerWidth}px 1fr`,
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '100%',
  },
}));

export type DocsPageProps = {
  docsMenuProps: {
    application: string;
    title: string;
    logo: IBurdyImage[];
    links: ListProps;
    logoHref?: string;
  };
  footerProps: FooterProps;
};

const DocsMain = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
}));

const DocsPage: BurdyPage<DocsPageProps> = (props) => {
  const { asPath } = useRouter();
  const page = usePreview(props.page);
  const pageContent = page.meta.content;

  const { footerProps, docsMenuProps } = props;

  const { title, application, logo, logoHref, links } = docsMenuProps;

  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const opened = useMemo(
    () =>
      links.items
        ?.map((item, index) => (item.subLinks?.some((link) => link?.href === asPath) ? index : -1))
        .filter((i) => i >= 0)
        .reduce(
          (acc, value) => ({
            ...acc,
            [value]: true,
          }),
          {}
        ),
    [links, asPath]
  );

  const DrawerList = () => <List {...links} defaultOpened={opened} onClick={() => setMobileOpen(false)} />;

  const DrawerTypography = () => (
    <Typography variant="h6" noWrap sx={{ fontWeight: 'bold' }} component="div">
      {title || ''}
    </Typography>
  );

  return (
    <DocsContainer>
      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          width: drawerWidth,
          [theme.breakpoints.up('md')]: {
            display: 'none',
          },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
          <DrawerTypography />
        </Toolbar>
        <DrawerList />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [theme.breakpoints.down('md')]: {
            display: 'none',
          },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
          <DrawerTypography />
        </Toolbar>
        <DrawerList />
      </Drawer>
      <DocsMain>
        <Toolbar
          sx={{
            borderBottom: `1px solid ${theme.palette.divider}`,
            position: 'sticky',
            top: 0,
            zIndex: 5,
            background: theme.palette.common.white,
          }}
        >
          <IconButton
            aria-label="menu"
            sx={{ display: { md: 'none' }, mr: 2, color: 'inherit' }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <MenuIcon fontSize="inherit" />
          </IconButton>
          <Link noLinkStyle href={logoHref || '/'}>
            <Box
              sx={{
                display: 'grid',
                gridAutoFlow: 'column',
                gridGap: theme.spacing(1),
                justifyContent: 'center',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              {(logo?.length || []) > 0 && (
                <Image {...logo?.[0]} height={36} width={36} sx={{ width: 36, height: 36, objectFit: 'contain' }} />
              )}
              <Typography variant="h6" component="span" noWrap color="primary">
                {application || ''}
              </Typography>
            </Box>
          </Link>
        </Toolbar>
        <Container maxWidth="lg">
          <RichtextSection content={pageContent.content} />
        </Container>
        <Footer
          sx={{ marginTop: 'auto' }}
          copyright={footerProps?.copyright || ''}
          copyrightLinks={footerProps?.copyrightLinks}
          maxWidth={'lg'}
        />
      </DocsMain>
    </DocsContainer>
  );
};

export const getTemplateProps: GetTemplateProps = async (page, path, options) => {
  const { footer, docsMenu } = cmsRewrites.rewriteMap(path);

  const [footerFragment, docsMenuFragment] = await Promise.all([getPost(footer, options), getPost(docsMenu, options)]);

  const { sections: _, ...footerContent } = footerFragment.meta.content;

  return {
    footerProps: footerContent,
    docsMenuProps: docsMenuFragment.meta.content,
  };
};

export default DocsPage;
