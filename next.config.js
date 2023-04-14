/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['webpack'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "stream": require.resolve("stream-browserify"),
      "path": require.resolve("path-browserify"),
      "fs": false,
    };
    return config;
  },
}

module.exports = nextConfig
