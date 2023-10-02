/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    const BASE_API_HOST = process.env.NEXT_PUBLIC_BASE_API_HOST;
    const BASE_API_PORT = process.env.NEXT_PUBLIC_BASE_API_PORT;

    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://'
          .concat('test')
          .concat(':')
          .concat('1234')
          .concat('/api/v1/:path*'),
      },
    ];
  },
};
