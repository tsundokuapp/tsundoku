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
      {
        hostname: 'tsundoku.com.br',
      },
    ],
  },
};

export default nextConfig;
