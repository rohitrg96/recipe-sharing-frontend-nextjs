import React from 'react';
import Head from 'next/head';

interface MetaTagsProps {
  title: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description = 'A recipe-sharing platform to create, share, and discover delicious recipes.',
  keywords = 'recipes, cooking, food, add recipe',
  ogTitle,
  ogDescription,
  ogImage = '/default-thumbnail.jpg', // Default image
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};

export default MetaTags;
