import { inter } from "./fonts";
import "./globals.css";

export const metadata = {
  title: "Conveyor Belt Condition Monitoring",
  description: "Conveyor Belt Condition Monitoring Panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
