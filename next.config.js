/** @type {import('next').NextConfig} */
const nextConfig = () => {
  const BASE_API_HOST = process.env.NEXT_PUBLIC_BASE_API_HOST;
  const BASE_API_PORT = process.env.NEXT_PUBLIC_BASE_API_PORT;

  const rewrites = () => {
    return [
      {
        source: '/api/v1/:path*',
        destination:
          'https://' + BASE_API_HOST + ':' + BASE_API_PORT + '/api/v1/:path*',
      },
    ];
  };

  return { rewrites };
};

module.exports = nextConfig;
