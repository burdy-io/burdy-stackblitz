import { BurdyPage, GetTemplateProps, IBurdyPage } from '../../types/burdy-cms';
import { Footer, Header, FooterProps, HeaderProps } from '../fragments';
import { LayoutSection, HeroSection } from '../sections';
import { cmsRewrites } from '../../common/rewrites';
import { useTheme } from '@mui/material';
import { Link, MediaCard } from '../atoms';
import React from 'react';
import { getPost } from '../../common/burdy-api';
import { usePreview } from '@burdy-cms/react-utils';

export type BlogsTemplateProps = {
  blogs: IBurdyPage<any>[];
  headerProps: HeaderProps;
  footerProps: FooterProps;
};

const BlogsPage: BurdyPage<BlogsTemplateProps> = (props) => {
  const page = usePreview(props.page);
  const { blogs, footerProps, headerProps } = props;

  const theme = useTheme();
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
        image={pageContent?.image?.[0]}
        sx={{ minHeight: '20vh' }}
        curve
      />
      <LayoutSection
        gap={3}
        padding={theme.spacing(1.5, 0)}
        template="repeat(3, 1fr)"
        tabletTemplate="repeat(2, 1fr)"
        mobileTemplate="1fr"
      >
        {blogs.map((blog) => {
          const blogContent = blog.meta.content;

          return (
            <Link key={blog.id} href={`/blogs/${blog.slug}`} sx={{ textDecoration: 'none !important' }}>
              <MediaCard
                title={blogContent?.title}
                description={blogContent?.description}
                image={blogContent?.featured?.[0]}
                avatar={{
                  firstName: 'Team',
                  lastName: 'Burdy',
                }}
                createdAt={new Date(blog.createdAt)}
              />
            </Link>
          );
        })}
      </LayoutSection>
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
  const { page: pagePath, header, footer } = cmsRewrites.rewriteMap(path);

  const [headerData, footerData, pageData] = await Promise.all([
    getPost(header, options),
    getPost(footer, options),
    getPost(pagePath, {
      ...(options || {}),
      perPage: 100,
      includeChildren: true,
    }),
  ]);

  const headerProps = headerData.meta.content;
  const footerProps = footerData.meta.content;

  return {
    headerProps,
    footerProps,
    blogs: pageData?.posts?.sort?.((a, b) => new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime()) || [],
  };
};

export default BlogsPage;
