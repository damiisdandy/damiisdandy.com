import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "~/components/navbar/navbar";
import Footer from "~/components/footer/footer";

type LayoutProps = {
  children: React.ReactNode;
};

const Container = ({ children }: LayoutProps) => {
  return (
    <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
      <Navbar />
      <div className="min-h-[calc(100vh-theme(space.48))]">{children}</div>
      <Footer />
    </div>
  );
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${GeistSans.className} bg-neutral-900 p-5 text-neutral-200`}
      >
        <TRPCReactProvider>
          <Container>{children}</Container>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

export const metadata = {
  title: "Damiisdandy",
  description: "A Developer with a bachelor's degree in Engineering",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
