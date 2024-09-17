/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: false,
    reactStrictMode: false,
    eslint: { ignoreDuringBuilds: true },
    basePath: '/folder',
};

export default nextConfig;
