import { createRewrites } from '@burdy-cms/web-utils';

export const cmsRewrites = createRewrites({
  origin: `${process.env.NEXT_PUBLIC_CMS_URL}/api/content`,
  rewriteMap: [
    {
      source: '/:lang(fr|de)/:path*',
      rewrites: {
        page: '/sites/{lang}/{path}',
        footer: '/sites/{lang}/fragments/footer',
        header: '/sites/{lang}/fragments/header',
        docsMenu: '/sites/{lang}/fragments/docs-menu',
      },
    },
    {
      source: '/:path*',
      rewrites: {
        page: '/sites/en/{path}',
        footer: '/sites/en/fragments/footer',
        header: '/sites/en/fragments/header',
        docsMenu: '/sites/en/fragments/docs-menu',
      },
    },
  ],
});
