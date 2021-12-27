import React, { FC, useMemo } from 'react';
import { Breakpoint, useTheme } from '@mui/system';
import { alpha } from '@mui/system/colorManipulator';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Link, LinkProps } from '../atoms';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

const FooterRootStyled = styled('div')(({ theme }) => ({
  backgroundColor: `${theme.palette.primary.dark}`,
  color: theme.palette.common.white,
  fontSize: theme.typography.body2.fontSize,
}));

const FooterLegalsLinksStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '& > *:not(:last-child)': {
    marginRight: theme.spacing(2),
  },
}));

const FooterLegalsDivider = styled('div')(({ theme }) => ({
  width: 1,
  height: theme.spacing(2),
  background: theme.palette.primary.light,
}));

const FooterLegalsStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    alignItems: 'start',
    flexDirection: 'column-reverse',
  },
}));

export type FooterSection = {
  title?: string;
  links?: LinkProps[];
};

export type FooterProps = {
  maxWidth?: Breakpoint;
  copyright?: string;
  copyrightLinks?: LinkProps[];
  sections?: FooterSection[];
} & React.HTMLAttributes<HTMLDivElement>;

const Footer: FC<FooterProps> = (props) => {
  const { maxWidth, copyright, copyrightLinks, sections, className, ...rest } = props;
  const theme = useTheme();
  const mobileBreakpoint = useMediaQuery(theme.breakpoints.down('sm'));

  const hasSections = useMemo(() => (sections || [])?.length > 0, [sections]);
  const hasCopyright = useMemo(() => copyright || (copyrightLinks || [])?.length > 0, [copyrightLinks, copyright]);

  return (
    <FooterRootStyled {...rest}>
      {hasSections && (
        <Container
          sx={{
            pt: 4,
            pb: 4,
          }}
          maxWidth={maxWidth ?? 'lg'}
        >
          <Grid container spacing={mobileBreakpoint ? 2 : 3}>
            {(sections || []).map((section, index) => {
              return (
                <React.Fragment key={index}>
                  <Grid
                    item
                    lg={3}
                    md={6}
                    sm={6}
                    sx={{
                      display: {
                        xs: 'none',
                        sm: 'block',
                      },
                    }}
                  >
                    {section?.title && (
                      <Typography
                        variant={'body1'}
                        sx={{
                          borderBottom: `1px solid ${theme.palette.primary.light}`,
                          mb: 2,
                          pb: 1,
                          fontWeight: 'bold',
                        }}
                      >
                        {section.title}
                      </Typography>
                    )}
                    {(section?.links || []).length > 0 && (
                      <Grid container direction="row">
                        {(section.links || []).map(({ title, ...link }) => (
                          <Grid key={title} item xs={12}>
                            <Link
                              sx={{
                                color: 'common.white',
                                textDecoration: 'none',
                                display: 'block',
                                pt: 0.5,
                                pb: 0.5,
                              }}
                              {...link}
                            >
                              {title}
                            </Link>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Grid>

                  <Grid item xs={12} sx={{ display: { sm: 'none' } }}>
                    <Accordion
                      sx={{
                        backgroundColor: alpha(theme.palette.primary.light, 0.15),
                        color: theme.palette.common.white,
                      }}
                    >
                      <AccordionSummary
                        expandIcon={
                          <ExpandMoreIcon
                            sx={{
                              color: theme.palette.common.white,
                            }}
                          />
                        }
                      >
                        {section.title ?? ''}
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container direction="row">
                          {(section?.links || []).map(({ title, ...link }) => (
                            <Grid key={title} item xs={12}>
                              <Link
                                sx={{
                                  color: 'common.white',
                                  textDecoration: 'none',
                                  display: 'block',
                                  pt: 0.5,
                                  pb: 0.5,
                                }}
                                {...link}
                              >
                                {title}
                              </Link>
                            </Grid>
                          ))}
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </React.Fragment>
              );
            })}
          </Grid>
        </Container>
      )}
      {hasCopyright && (
        <Container
          sx={{
            borderTop: hasSections ? `1px solid ${theme.palette.primary.light}` : 'none',
          }}
          maxWidth={maxWidth ?? 'lg'}
        >
          <FooterLegalsStyled>
            <Box
              sx={{
                pt: 1.25,
                pb: 1.25,
              }}
            >
              {copyright ?? ''}
            </Box>

            <FooterLegalsLinksStyled>
              {(copyrightLinks || []).length &&
                copyrightLinks?.map(({ title, ...link }, index) => (
                  <React.Fragment key={index}>
                    <Link
                      sx={{
                        color: theme.palette.common.white,
                        textDecoration: 'none',
                        padding: theme.spacing(1.25, 0),
                        display: 'block',
                        [theme.breakpoints.down('sm')]: {
                          padding: theme.spacing(1, 0),
                        },
                      }}
                      {...link}
                    >
                      {title}
                    </Link>
                    {index < copyrightLinks?.length - 1 && <FooterLegalsDivider />}
                  </React.Fragment>
                ))}
            </FooterLegalsLinksStyled>
          </FooterLegalsStyled>
        </Container>
      )}
    </FooterRootStyled>
  );
};

export default Footer;
