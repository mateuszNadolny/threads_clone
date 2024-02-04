import React from 'react';

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <body className="flex w-screen h-screen justify-center items-center">{children}</body>;
}
