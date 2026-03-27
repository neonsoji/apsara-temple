import type { NextConfig } from "next";

const nextConfig = {
  eslint: {
    // Avertissement: Ceci permet à Vercel de compiler même avec des erreurs ESLint
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Avertissement: Ceci permet à Vercel de compiler même avec des erreurs TypeScript
    ignoreBuildErrors: true,
  },
} as NextConfig;

export default nextConfig;
