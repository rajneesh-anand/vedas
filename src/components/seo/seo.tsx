import { NextSeo, NextSeoProps } from 'next-seo';

interface SeoProps extends NextSeoProps {
  path: string;
}

const Seo = ({ title, description, path }: SeoProps) => {
  return (
    <NextSeo
      title={`${title} | VedasOne Academy `}
      description={description}
      canonical={`${process.env.PUBLIC_URL}/${path}`}
      openGraph={{
        url: `${process.env.PUBLIC_URL}/${path}`,
        title: `${title} | VedasOne Academy `,
        description,
        images: [
          {
            url: '/images/og-image-vedas-1.png',
            width: 800,
            height: 370,
            alt: 'Og Image',
            type: 'image/png',
          },
          {
            url: '/images/og-image-vedas-1.png',
            width: 300,
            height: 139,
            alt: 'Og Image Two',
            type: 'image/png',
          },
        ],
      }}
    />
  );
};

export default Seo;
