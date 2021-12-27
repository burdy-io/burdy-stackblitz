import React, { FC, useState } from 'react';
import {
  Container,
  Theme,
  Tooltip,
  useTheme,
  IconButton,
  Drawer,
  Divider,
  tooltipClasses,
  TooltipProps,
  Toolbar,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { alpha } from '@mui/system/colorManipulator';
import { List, Image, ImageProps, Link, LinkProps } from '../atoms';
import GitHub from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';

const HeaderRootStyled = styled('header')(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 1100,
  backdropFilter: 'saturate(180%) blur(20px)',
  borderBottom: `1px solid ${theme.palette.grey['200']}`,
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
}));

const ul = (theme: Theme) => ({
  padding: 0,
  margin: 0,
  listStyle: 'none',
  display: 'flex',
  justifyContent: 'flex-end',
  '& > li': {
    display: 'inline-block',
    '&:not(:last-child)': {
      marginRight: theme.spacing(1),
    },
    '& > a': {
      textTransform: 'none',
      borderRadius: theme.shape.borderRadius,
      color: 'inherit',
      fontWeight: theme.typography.fontWeightBold,
      textDecoration: 'none',
      padding: theme.spacing(1),
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
      },
    },
  },
});

const NavStyled = styled('nav')<{ 'data-full': boolean }>(({ theme, ...props }) => ({
  flex: 1,
  '& > ul': ul(theme),
  ...(props['data-full'] && {
    '& > ul': {
      ...ul(theme),
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-end',
    },
  }),
}));

const LogoGroupStyled = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1),
  marginRight: theme.spacing(4),
  gridAutoFlow: 'column',
  alignItems: 'center',
  '& > .logo': {
    maxHeight: theme.spacing(6),
  },
}));

const MenuTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.getContrastText(theme.palette.background.default),
    maxWidth: 300,
    width: 300,
    padding: 0,
    paddingBottom: 0,
    paddingTop: 0,
    fontSize: theme.typography.pxToRem(12),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(0.75),
    overflow: 'hidden',
  },
}));

export type SubLinkProps = {
  icon?: JSX.Element;
  primary?: string;
  secondary?: string;
  href?: string;
} & Omit<LinkProps, 'href'>;

export type HeaderProps = {
  links?: (LinkProps & {
    subLinks?: SubLinkProps[];
  })[];
  actions?: JSX.Element[];
  logo?: ImageProps;
  logoTitle?: string;
  logoLink?: LinkProps;
};

const Header: FC<HeaderProps> = (props) => {
  const {
    logo,
    links,
    actions = [
      <Button
        key="github"
        sx={{ textTransform: 'none' }}
        variant={'contained'}
        startIcon={<GitHub />}
        href="https://github.com/burdy-io/burdy"
        target="_blank"
      >
        GitHub
      </Button>,
    ],
  } = props;
  const theme = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const hasActions = (actions || [])?.length > 0;
  const hasLinks = (links || [])?.length > 0;

  return (
    <HeaderRootStyled>
      <Container
        maxWidth="lg"
        sx={{
          height: theme.spacing(8),
          display: 'flex',
          alignItems: 'center',
          [theme.breakpoints.down('sm')]: {
            height: theme.spacing(7),
          },
          '& > *:not(:last-child)': {
            marginRight: theme.spacing(2),
          },
        }}
      >
        {hasLinks && (
          <IconButton
            aria-label="menu"
            sx={{ display: { sm: 'none' }, mr: 2, color: 'inherit' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <MenuIcon fontSize="inherit" />
          </IconButton>
        )}
        <Link noLinkStyle href={'/'}>
          <LogoGroupStyled>
            <Box
              sx={{
                maxHeight: theme.spacing(6),
                maxWidth: theme.spacing(6),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image src={logo?.src} alt={logo?.alt} height={36} width={36} />
            </Box>
            <Typography variant={'h6'} component="span" sx={{ color: 'primary.main' }}>
              Burdy
            </Typography>
          </LogoGroupStyled>
        </Link>
        {hasLinks && (
          <NavStyled data-full={!hasActions} sx={{ display: { xs: 'none', sm: 'block' } }}>
            <ul>
              {(links || []).map(({ subLinks, ...link }, index) => (
                <li key={index}>
                  {(subLinks || [])?.length > 0 ? (
                    <MenuTooltip placement={'bottom'} title={<List items={subLinks} />}>
                      <Link sx={{ cursor: 'pointer' }} {...link}>
                        {link?.title}
                      </Link>
                    </MenuTooltip>
                  ) : (
                    <Link {...link}>{link?.title}</Link>
                  )}
                </li>
              ))}
            </ul>
          </NavStyled>
        )}
        {hasActions && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              '& > *:not(:last-child)': {
                marginRight: theme.spacing(2),
              },
              [theme.breakpoints.down('sm')]: {
                flex: 1,
              },
            }}
          >
            {(actions || []).map((action) => action)}
          </Box>
        )}
      </Container>
      {hasLinks && (
        <Drawer
          onClose={() => setMobileMenuOpen(false)}
          sx={{
            display: { md: 'none', lg: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
          open={mobileMenuOpen}
        >
          <div>
            <Toolbar />
            <Divider />
            <List
              items={links}
              onClick={({ href }) => {
                if (href) setMobileMenuOpen(false);
              }}
            />
          </div>
        </Drawer>
      )}
    </HeaderRootStyled>
  );
};

export default Header;
