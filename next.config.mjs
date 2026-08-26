/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep local development output separate from production builds so the two
  // processes cannot overwrite each other's server chunks.
  distDir: process.env.NEXT_DIST_DIR || (process.env.NODE_ENV === "production" ? ".next" : ".next-dev"),
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["react-icons", "react-icons/fa", "gsap"],
  },
};

export default nextConfig;
