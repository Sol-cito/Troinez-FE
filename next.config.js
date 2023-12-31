/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    const BASE_API_HOST = process.env.NEXT_PUBLIC_BASE_API_HOST;
    const BASE_API_PORT = process.env.NEXT_PUBLIC_BASE_API_PORT;

    return [
      {
        source: '/api/v1/:path*',
        destination: (BASE_API_HOST === 'localhost' ? 'http://' : 'https://')
          .concat(BASE_API_HOST)
          .concat(':')
          .concat(BASE_API_PORT)
          .concat('/api/v1/:path*'),
      },
    ];
  },
  images: {
    domains: ['d3en4rwu5hlcjb.cloudfront.net'],
  },
};
