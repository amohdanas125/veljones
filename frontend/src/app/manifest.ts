import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VALJONS Atelier | Drop 001 — PC Fleece',
    short_name: 'VALJONS',
    description: 'Engineered for longevity. High-end PC fleece streetwear essentials, 280 GSM straight-fit silhouettes.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#801414',
    icons: [
      {
        src: '/images/valjons-monogram-black.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/valjons-monogram-black.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
