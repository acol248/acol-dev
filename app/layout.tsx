// components
import Navbar from "@/components/Navbar";
import { elementTheme, generateCSSVariables, theme } from "@/interface/index";

// styles
import "@/styles/globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navbarItems = [{ name: "About", type: "internal", href: "/about" }];

  const themeStyles = generateCSSVariables(theme);
  const elementsTheme = generateCSSVariables(elementTheme);

  return (
    <html lang="en">
      <body>
        <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
        <style dangerouslySetInnerHTML={{ __html: elementsTheme }} />

        <Navbar items={navbarItems} />

        <main>{children}</main>
      </body>
    </html>
  );
}
