import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {ClerkProvider} from "@clerk/nextjs";
import {ModalProvider} from "@/providers/modal-provider";
import {ToasterProvider} from "@/providers/toast-provider";
import React from "react";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'E-Commerce Admin Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <ClerkProvider>
        <html lang="en">
        <ToasterProvider />
        <ModalProvider />
          <body className={inter.className}>{children}</body>
        </html>
      </ClerkProvider>
  )
}
