import { BurdyPage, GetTemplateProps } from '../../types/burdy-cms';
import { Container, styled, useTheme } from '@mui/material';
import { cmsRewrites } from '../../common/rewrites';
import { Footer, Header } from '../fragments';
import { HeaderProps } from '../fragments/header';
import { FooterProps } from '../fragments/footer';
import { componentMapper } from '../componentMapper';
import React from 'react';
import { getPost } from '../../common/burdy-api';
import { RichText, usePreview } from '@burdy-cms/react-utils';
import {RichtextSection} from "../sections";

export type ComparisonTemplateProps = {
  headerProps: HeaderProps;
  footerProps: FooterProps;
};

const ComparisonPage: BurdyPage<ComparisonTemplateProps> = (props) => {
  const page = usePreview(props.page);
  const { headerProps, footerProps } = props;

  const pageContent = page.meta.content;
  const theme = useTheme();

  return (
    <>
      <Header
        logo={headerProps?.logo?.[0]}
        logoTitle="Burdy"
        logoLink={{ href: '/' }}
        links={headerProps?.links?.map?.((link) => (link as any)?.link || undefined)}
      />
      <Container maxWidth="lg" sx={{ marginBottom: theme.spacing(4) }}>
        <RichtextSection content={pageContent?.content} />
        {componentMapper({
          ...pageContent.comparisonTable,
          component_name: 'feature-table',
        })}
      </Container>
      <Footer
        sections={footerProps?.sections || []}
        copyright={footerProps?.copyright || ''}
        copyrightLinks={footerProps?.copyrightLinks}
        maxWidth={footerProps?.maxWidth || 'lg'}
      />
    </>
  );
};

export const getTemplateProps: GetTemplateProps = async (page, path, options) => {
  const { header, footer } = cmsRewrites.rewriteMap(path);

  const [headerData, footerData] = await Promise.all([getPost(header, options), getPost(footer, options)]);

  const headerProps = headerData.meta.content;
  const footerProps = footerData.meta.content;

  return {
    headerProps,
    footerProps,
  };
};

export default ComparisonPage;
