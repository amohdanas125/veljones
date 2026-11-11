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
  title: 'VALJONS | Drop 001 — PC Fleece (280 GSM, Straight Fit)',
  description: 'Engineered for longevity. High-end PC fleece streetwear essentials, 280 GSM straight-fit silhouettes.',
  keywords: ['VALJONS', 'streetwear', 'luxury fleece', 'straight fit sweatpants', '280 GSM', 'Drop 001', 'PC Fleece'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
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
