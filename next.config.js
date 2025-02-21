/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.iconscout.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'leetcode.com',
      },
      {
        protocol: 'https',
        hostname: 'scontent.fdac14-1.fna.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'img.atcoder.jp',
      },
      {
        protocol: 'https',
        hostname: 'toph.co',
      },
      {
        protocol: 'https',
        hostname: 'resources.beecrowd.com.br',
      },
    ],
  },
  poweredByHeader: false,
}

module.exports = nextConfig 