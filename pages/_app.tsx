import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../common/theme';
import createEmotionCache from '../common/createEmotionCache';
import SeoHead from '../components/atoms/seo-head';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  footerData?: any;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{pageProps?.page?.meta?.content?.seo?.title || 'Burdy'}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        {process.env.NODE_ENV === 'production' && <script
          dangerouslySetInnerHTML={{
            __html:
              'window.$crisp=[];window.CRISP_WEBSITE_ID="cabf82f9-8621-4b83-af03-f7eda9b422b2";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();',
          }}
        />}
        <SeoHead
          title={pageProps?.page?.meta?.content?.seo?.title}
          description={pageProps?.page?.meta?.content?.seo?.description}
          featured={pageProps?.page?.meta?.content?.seo?.featured?.[0]}
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
