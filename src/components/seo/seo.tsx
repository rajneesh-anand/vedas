import { NextSeo, NextSeoProps } from 'next-seo';

interface SeoProps extends NextSeoProps {
  path: string;
}

const Seo = ({ title, description, path }: SeoProps) => {
  return (
    <NextSeo
      title={`${title} | Vedas Academy `}
      description={description}
      canonical={`${process.env.PUBLIC_URL}/${path}`}
      openGraph={{
        url: `${process.env.PUBLIC_URL}/${path}`,
        title: `${title} | Vedas Academy `,
        description,
        images: [
          {
            url: '/images/og-image-01.png',
            width: 800,
            height: 600,
            alt: 'Og Image Alt',
          },
          {
            url: '/images/og-image-02.png',
            width: 900,
            height: 800,
            alt: 'Og Image Alt Second',
          },
        ],
      }}
    />
  );
};

export default Seo;
