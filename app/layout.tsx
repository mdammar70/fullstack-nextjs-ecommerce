import Navbar from "@/app/components/Navbar";
import "./globals.css";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Hydrate from "./components/Hydrate";
import { Open_Sans, Lobster_Two } from "@next/font/google";

const roboto = Open_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const lobster = Lobster_Two({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-lobster",
});
export const metadata = {
  title: "Andy's Store",
  description: "FullStack NextJs E-commerce App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html className ={`${roboto.variable} ${lobster.variable}`} lang="en">
        <Hydrate>
          <Navbar user={session?.user} expires={session?.expires as string} />
          {children}
        </Hydrate>
    </html>
  );
}
