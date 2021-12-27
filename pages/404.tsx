import { Footer, Header } from '../components/fragments';
import Head from 'next/head';
import axios from 'axios';
import { IBurdyPage } from '../types/burdy-cms';
import { GetServerSideProps } from 'next';
import { cmsRewrites } from '../common/rewrites';
import React, { useEffect, useState } from 'react';
import { ContentSection } from '../components/sections';
import { Box } from '@mui/material';

export default function Custom404() {
  const [headerProps, setHeaderProps] = useState<any>();
  const [footerProps, setFooterProps] = useState<any>();

  useEffect(() => {
    (async () => {
      const { header, footer } = cmsRewrites.rewriteMap('/');

      const [{ data: headerData }, { data: footerData }] = await Promise.all([
        axios.get<IBurdyPage<any>>(header),
        axios.get<IBurdyPage<any>>(footer),
      ]);

      setHeaderProps(headerData.meta.content);
      setFooterProps(footerData.meta.content);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>404 Not Found | Burdy</title>
      </Head>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {headerProps && (
          <Header
            logo={headerProps?.logo?.[0]}
            logoTitle="Burdy"
            logoLink={{ href: '/' }}
            links={headerProps?.links?.map?.((link) => link?.link || undefined)}
          />
        )}
        <ContentSection
          title="404 Not Found"
          primaryAction={{
            title: 'Go Home',
            href: '/',
          }}
        />
        {footerProps && (
          <Footer
            sections={footerProps?.sections || []}
            copyright={footerProps?.copyright || ''}
            copyrightLinks={footerProps?.copyrightLinks}
            maxWidth={footerProps?.maxWidth || 'lg'}
          />
        )}
      </Box>
    </>
  );
}
