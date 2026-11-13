import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/why-valjones',
        destination: '/why-valjons',
        permanent: true,
      },
      {
        source: '/whyvaljons',
        destination: '/why-valjons',
        permanent: true,
      },
      {
        source: '/whyvaljones',
        destination: '/why-valjons',
        permanent: true,
      },
      {
        source: '/why valjons',
        destination: '/why-valjons',
        permanent: true,
      },
      {
        source: '/why valjones',
        destination: '/why-valjons',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
