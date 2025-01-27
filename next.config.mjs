/** @type {import('next').NextConfig} */
const hostnames = [
  'images.unsplash.com', // -> Unsplash remover ao final do projeto
  'cdn.discordapp.com', // -> Discord remover ao final do projeto
  'tsundoku.com.br', // -> WordPress -> tsundoku.com.br
  'dejrqqh1w9hhl.cloudfront.net', // -> AWS CloudFront
  'i0.wp.com', // WordPress -> tsundoku.com.br
];

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: hostnames.map((hostname) => ({
      protocol: 'https',
      hostname,
    })),
  },
};

export default nextConfig;
