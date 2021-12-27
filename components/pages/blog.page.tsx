import { BurdyPage, GetTemplateProps } from '../../types/burdy-cms';
import { HeaderProps, FooterProps } from '../fragments';
import { Container } from '@mui/material';
import { Footer, Header } from '../fragments';
import { HeroSection } from '../sections';
import { cmsRewrites } from '../../common/rewrites';
import React from 'react';
import RichtextSection from '../sections/richtext.section';
import { getPost } from '../../common/burdy-api';
import { usePreview } from '@burdy-cms/react-utils';

export type BlogsTemplateProps = {
  headerProps: HeaderProps;
  footerProps: FooterProps;
};

const BlogPage: BurdyPage<BlogsTemplateProps> = (props) => {
  const page = usePreview(props.page);
  const { footerProps, headerProps } = props;

  const pageContent = page.meta.content;

  return (
    <>
      <Header
        logo={headerProps?.logo?.[0]}
        logoTitle="Burdy"
        logoLink={{ href: '/' }}
        links={headerProps?.links?.map?.((link) => link?.link || undefined)}
      />
      <HeroSection
        title={pageContent.title}
        description={pageContent?.description}
        image={pageContent?.featured?.[0]}
        sx={{ minHeight: '20vh' }}
        imageSx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
        curve
      />
      <Container maxWidth="md">
        <RichtextSection content={pageContent?.content} />
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

export default BlogPage;
