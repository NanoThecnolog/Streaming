/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'external-content.duckduckgo.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'blogger.googleusercontent.com',
        port: '',
      }
    ]
  }
  //output: 'export'
};

export default nextConfig;
