/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ['i0.wp.com', 'i1.wp.com', 'i3.wp.com', 'i2.wp.com']
  },
}

module.exports = nextConfig
