import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import "./globals.css";

export const metadata = {
  title: "Swel Pay Lar",
  description: "Graphic Design Service",
  icons: {
    icon: ["/favicon.ico?v=5"],
    apple: ["/apple-touch-icon.png?v=5"],
    shortcut: ["apple-touch-icon.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-clashRegular" suppressHydrationWarning={true}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
