/** @type {import('next').NextConfig} */
module.exports = {
  // rewrite
  async rewrites() {
    return [
      {
        // source : 유저가 진입할 path
        // destination : 유저가 이동할 path
        source: '/api/v1/:path*',
        destination: 'https://troisnezdev.com:8080/api/v1/:path*',
      },
    ];
  },
};
