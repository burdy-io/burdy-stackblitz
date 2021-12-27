import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { cmsRewrites } from '../common/rewrites';
import axios from 'axios';
import { getPost, GetPostOptions } from '../common/burdy-api';
import { IBurdyPage } from '../types/burdy-cms';
import { Templates } from '../components/templateMapper';

export type WebsiteProps = {
  page: IBurdyPage<any>;
  [key: string]: any;
};

const Website: NextPage<WebsiteProps> = (props) => {
  const contentTypeName = props.page.contentType.name;
  const Template = Templates?.[contentTypeName].default;

  return (
    <>
      <Template {...props} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const path = '/' + ((context.params?.slug as string[]) || []).join('/');

    const previewData: any = context.previewData;
    const options: GetPostOptions = {};
    if (context.preview) {
      options.token = previewData?.token;
    }
    const { page: pagePath } = cmsRewrites.rewriteMap(path);
    const page = await getPost(pagePath, options);

    const contentTypeName = page.contentType.name;
    const template = Templates?.[contentTypeName];

    if (!template)
      return {
        notFound: true,
      };

    const additionalProps = (await template?.getTemplateProps?.(page, path, options)) || {};

    return {
      props: {
        page,
        ...(additionalProps || {}),
      },
    };
  } catch (e) {
    console.log(e);
    return {
      notFound: true,
    };
  }
};

export default Website;
