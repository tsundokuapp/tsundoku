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
      {
        // TODO: isso aqui é uma URL dinâmica? precisamos confirmar e alterar o hostname
        hostname: 'dejrqqh1w9hhl.cloudfront.net',
      },
    ],
  },
};

export default nextConfig;
