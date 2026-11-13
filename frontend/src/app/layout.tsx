import type { Metadata } from 'next';
import { Poppins, Montserrat } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import Header from '@/components/Header';
import ValjonsFooter from '@/components/ValjonsFooter';
import CartDrawer from '@/components/CartDrawer';
import WishlistDrawer from '@/components/WishlistDrawer';
import SearchModal from '@/components/SearchModal';
import MobileNavDrawer from '@/components/MobileNavDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import VideoReelModal from '@/components/VideoReelModal';
import OurStoryModal from '@/components/OurStoryModal';
import ContactModal from '@/components/ContactModal';
import ToastContainer from '@/components/ToastContainer';
import JsonLd from '@/components/JsonLd';

const SITE_URL = 'https://heartfelt-trifle-08576c.netlify.app';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'VALJONS | Drop 001 — PC Fleece (280 GSM, Straight Fit)',
    template: '%s | VALJONS',
  },
  description:
    'Engineered for longevity. High-end PC fleece streetwear essentials, 280 GSM straight-fit silhouettes, custom dye palettes, and Indian atelier craft.',
  keywords: [
    'VALJONS',
    'VALJONES',
    'streetwear India',
    'luxury fleece',
    'straight fit sweatpants',
    '280 GSM fleece',
    'Drop 001',
    'PC Fleece',
    'architectural streetwear',
    'premium oversized tees',
    'cash on delivery streetwear',
  ],
  authors: [{ name: 'VALJONS Atelier', url: SITE_URL }],
  creator: 'VALJONS',
  publisher: 'VALJONS Atelier',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'VALJONS | Drop 001 — PC Fleece (280 GSM, Straight Fit)',
    description:
      'Engineered for longevity. High-end PC fleece streetwear essentials, 280 GSM straight-fit silhouettes.',
    url: SITE_URL,
    siteName: 'VALJONS Atelier',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/products/valjons-heavyweight-fleece.jpg',
        width: 1200,
        height: 630,
        alt: 'VALJONS Heavyweight PC Fleece Atelier Drop 001',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VALJONS | Drop 001 — PC Fleece (280 GSM, Straight Fit)',
    description:
      'Engineered for longevity. High-end PC fleece streetwear essentials, 280 GSM straight-fit silhouettes.',
    creator: '@valjons',
    images: ['/images/products/valjons-heavyweight-fleece.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/images/valjons-monogram-black.png', type: 'image/png' },
      { url: '/images/valjons-monogram.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/images/valjons-monogram-black.png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <JsonLd />
      </head>
      <body
        className={`${poppins.variable} ${montserrat.variable} antialiased bg-white text-neutral-900 selection:bg-black selection:text-white`}
      >
        <StoreProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <ValjonsFooter />
          </div>

          {/* Overlays & Drawers */}
          <CartDrawer />
          <WishlistDrawer />
          <SearchModal />
          <MobileNavDrawer />
          <QuickViewModal />
          <VideoReelModal />
          <OurStoryModal />
          <ContactModal />
          <ToastContainer />
        </StoreProvider>
      </body>
    </html>
  );
}
