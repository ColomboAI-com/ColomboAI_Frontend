/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: false,
    reactStrictMode: false,
    eslint: { ignoreDuringBuilds: true }
};

export default nextConfig;
