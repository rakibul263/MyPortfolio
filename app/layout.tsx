import './globals.css';
import { Poppins, Open_Sans } from 'next/font/google';
import PageTransition from './components/PageTransition';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from 'react-hot-toast';

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
});

const openSans = Open_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-opensans'
});

export const metadata = {
  title: "Rakibul Hasan's Portfolio",
  description: 'Computer Science Student | Programmer | Educator',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} ${openSans.variable} font-opensans bg-[#0A192F] text-[#CCD6F6] selection:bg-[#64FFDA] selection:text-[#0A192F]`}>
        <div className="relative min-h-screen">
          {/* Background gradient */}
          <div className="fixed inset-0 bg-gradient-radial from-[#1A2942] to-[#0A192F] opacity-50 pointer-events-none" />
          
          {/* Background grid pattern */}
          <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
          
          {/* Content */}
          <PageTransition>
            <main className="relative z-10">
              {children}
            </main>
          </PageTransition>

          {/* Toast notifications */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 5000,
              style: {
                background: '#112240',
                color: '#CCD6F6',
                border: '1px solid #64FFDA',
              },
            }}
          />
        </div>

        {/* Scroll to top button */}
        <ScrollToTop />
      </body>
    </html>
  );
} 