import React from 'react';
import { Footer, Header, HeaderProps, FooterProps } from '../fragments';
import { BurdyPage, GetTemplateProps } from '../../types/burdy-cms';
import { cmsRewrites } from '../../common/rewrites';
import { AnnouncementSection } from '../sections';
import { componentMapper } from '../componentMapper';
import { getPost } from '../../common/burdy-api';
import { usePreview } from '@burdy-cms/react-utils';
import { cleanObjectPropTypes } from '../../utils/object.utils';

export type LandingPageProps = {
  footerProps: FooterProps;
  headerProps: HeaderProps;
};

const LandingPage: BurdyPage<LandingPageProps> = (props) => {
  const page = usePreview(props.page);

  const { footerProps, headerProps } = props;

  const sections = page?.meta?.content?.sections || [];

  return (
    <>
      {page?.meta?.content?.announcement && (
        <AnnouncementSection {...cleanObjectPropTypes(page?.meta?.content?.announcement)}></AnnouncementSection>
      )}
      <Header
        logo={headerProps?.logo?.[0]}
        logoTitle="Burdy"
        logoLink={{ href: '/' }}
        links={headerProps?.links?.map?.((link) => link?.link || undefined)}
      />
      {sections?.map?.(componentMapper)}
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
  const { footer, header } = cmsRewrites.rewriteMap(path);
  const [footerFragment, headerFragment] = await Promise.all([getPost(footer), getPost(header)]);

  return {
    footerProps: footerFragment?.meta?.content,
    headerProps: headerFragment?.meta?.content,
  };
};

export default LandingPage;
