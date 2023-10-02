/** @type {import('next').NextConfig} */

const BASE_API_HOST = process.env.NEXT_PUBLIC_BASE_API_HOST;
const BASE_API_PORT = process.env.NEXT_PUBLIC_BASE_API_PORT;

module.exports = {
  async rewrites() {
    console.log('---------rewrite test');
    console.log(BASE_API_HOST);
    console.log(BASE_API_PORT);

    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://'
          .concat(BASE_API_HOST)
          .concat(':')
          .concat(BASE_API_PORT)
          .concat('/api/v1/:path*'),
      },
    ];
  },
};
