/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'cdn.discordapp.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/comics/:slug/:chapter',
        destination: '/reader/comics/:slug/:chapter',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
