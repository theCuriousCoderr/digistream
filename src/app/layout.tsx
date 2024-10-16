import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: '%s | DigiStream',
    default: 'DigiStream', // a default is required when creating a template
  },
  description: "A digital solution designed to streamline administrative processes for students, providing a one-stop platform for managing various academic tasks. This internal tool allows students to digitally request transcripts, sign course forms, track requests, and handle other academic-related needs in a convenient, centralized system.",
  keywords: ["Digital Transcript Requests", "Form Signing", "Request Tracking", "Secure Data Management"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
