import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "~/components/navbar/navbar";
import Footer from "~/components/footer/footer";
import { type Metadata } from "next";
import { PHProvider } from "./provider";
import clsx from "clsx";
import PostHogPageView from "~/components/posthug/pageview";

type LayoutProps = {
  children: React.ReactNode;
};

const Container = ({ children }: LayoutProps) => {
  return (
    <div className="mx-auto md:max-w-3xl">
      <Navbar />
      <div className="min-h-[calc(100vh-theme(space.48))]">{children}</div>
      <Footer />
    </div>
  );
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <PHProvider>
        <PostHogPageView />
        <body
          className={clsx(
            "leading bg-neutral-900 p-5 font-sans text-neutral-300",
            GeistMono.variable,
            GeistSans.variable,
          )}
        >
          <TRPCReactProvider>
            <Container>{children}</Container>
          </TRPCReactProvider>
        </body>
      </PHProvider>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL("https://damiisdandy.com"),
  title: {
    default: "Damilola Jerugba",
    template: "%s | Damilola Jerugba",
  },
  description: "Developer with a bachelor's degree in Mechanical Engineering.",
  openGraph: {
    title: "Damilola Jerugba",
    description:
      "Developer with a bachelor's degree in Mechanical Engineering.",
    url: "https://damiisdandy.com",
    siteName: "Damilola Jerugba",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Damilola Jerugba",
    card: "summary_large_image",
  },
};
