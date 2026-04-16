/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
