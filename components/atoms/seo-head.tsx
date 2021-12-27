import React from 'react';

const SeoHead = ({ title, description, featured }) => {
  return (
    <>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={featured?.src} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={featured?.src} />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
};

export default SeoHead;
