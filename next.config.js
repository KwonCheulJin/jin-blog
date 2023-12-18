/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const nextConfig = {
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iozhvnavvkkqttsrqiyc.supabase.co',
        port: '',
        pathname: '/storage/**',
      },
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
