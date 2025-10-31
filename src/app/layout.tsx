import { Analytics } from "@vercel/analytics/next";
import "../app/globals.css";
import SEO from "../components/SEO";

// Navigation and Footer remain removed as requested in the previous step.

export const metadata = {
  // --- Updated Metadata for Portfolio ---
  title: "Shubham | Portfolio & Digital Creations",
  description:
    "The official portfolio of Shubham. Showcasing work in web development, design, and digital art.",
  keywords: [
    "Shubham portfolio",
    "web developer",
    "digital creator",
    "React developer",
    "Flutter developer",
    "Next developer",
    "personal branding",
  ],
  authors: [{ name: "Shubham", url: "https://www.notshubham.com" }],
  alternates: { canonical: "https://www.notshubham.com" },
  openGraph: {
    title: "Shubham | Portfolio & Digital Creations",
    description:
      "Showcasing projects and creations by Shubham.",
    url: "https://www.notshubham.com",
    siteName: "notshubham.com",
    images: [
      {
        url: "/shubham-og-image.png", // Updated OG image path
        width: 1200,
        height: 630,
        alt: "Shubham's Portfolio Preview",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubham | Portfolio & Digital Creations",
    description:
      "The official portfolio of Shubham.",
    images: ["/shubham-og-image.png"],
    creator: "@notshubham", // Updated Twitter handle
  },
  icons: {
    icon: "/shubham-favicon.svg", // Updated icon path
    shortcut: "/shubham-favicon.svg",
    apple: "/shubham-favicon.svg",
  },
  // ----------------------------------------
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Updated favicon paths */}
        <link rel="icon" href="/shubham-favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>

      <body
        className={`bg-amcmep-bg text-amcmep-text antialiased font-sans text-sm`}
      >
        <main className="flex-grow p-4">{children}</main>
        
        <SEO />
        <Analytics />
      </body>
    </html>
  );
}