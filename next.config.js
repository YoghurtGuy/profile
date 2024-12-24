/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lastfm.freetls.fastly.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img1.doubanio.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img2.doubanio.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img3.doubanio.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img9.doubanio.com',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig 