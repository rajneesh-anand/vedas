import { DefaultSeo as NextDefaultSeo } from 'next-seo';
import { siteSettings } from '@settings/site-settings';

export const DefaultSeo = () => {
  return (
    <NextDefaultSeo
      title={siteSettings.name}
      titleTemplate={`%s`}
      defaultTitle={siteSettings.name}
      description={siteSettings.description}
      canonical="https://vedusone.com/"
      openGraph={{
        type: 'website',
        locale: 'en_IE',
        site_name: siteSettings.name,
      }}
      twitter={{
        handle: '@vedusone',
        site: '@site',
        cardType: 'summary_large_image',
      }}
      additionalMetaTags={[
        {
          name: 'viewport',
          content:
            ' width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1',
        },
        {
          name: 'mobile-web-app-capable',
          content: 'yes',
        },
        {
          name: 'theme-color',
          content: '#ffffff',
        },
      ]}
      additionalLinkTags={[
        {
          rel: 'manifest',
          href: '/manifest.json',
        },
        {
          rel: 'apple-touch-icon',
          href: '/icons/apple-icon.png',
        },
      ]}
    />
  );
};
