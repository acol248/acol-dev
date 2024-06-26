// next
import { cookies } from "next/headers";

// components
import Navbar from "@/components/Navbar";
import ThemeWrapper from "@/components/ThemeWrapper";
import Footer from "@/components/Footer";

// styles
import "@/styles/globals.css";

export const metadata = {
  title: "acol.dev",
  description:
    "A development website, by acol248 (github). A showcase of his work and skills; whilst also being somewhere to experiment, learn, and have fun.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const navbarItems = [
    { name: "About", type: "internal", href: "/#about" },
    { name: "Projects", type: "internal", href: "/#projects" },
  ];

  const cookieStore = cookies();
  const theme = cookieStore.get("theme")?.value || "light";

  return (
    <html lang="en">
      <body>
        <ThemeWrapper value={String(theme)}>
          <Navbar items={navbarItems} />

          {children}

          <Footer />
        </ThemeWrapper>
      </body>
    </html>
  );
}
