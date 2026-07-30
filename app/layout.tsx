import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRM Lite",
  description: "Small Business CRM Lite — starter repo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/contacts">Contacts</Link>
          <Link href="/deals">Pipeline</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
