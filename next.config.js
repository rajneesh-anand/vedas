const { i18n } = require('./next-i18next.config');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const isProd = process.env.NODE_ENV === 'production';
const apiUrl = isProd
  ? ' https://vedusone.herokuapp.com/api'
  : 'http://localhost:8080/api';

const publicUrl = isProd ? 'https://www.vedusone.com' : 'http://localhost:3000';

module.exports = withPWA({
  env: {
    PUBLIC_URL: publicUrl,
    API_URL: apiUrl,
  },
  reactStrictMode: true,
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    runtimeCaching,
    register: true,
    skipWaiting: true,
  },
  i18n,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['res.cloudinary.com', 'source.unsplash.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
});
