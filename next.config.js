/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1년
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iozhvnavvkkqttsrqiyc.supabase.co',
        port: '',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/**',
      },
      {
        protocol: 'https',
        hostname: 'liveblocks.io',
        port: '',
        pathname: '/avatars/**',
      },
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
