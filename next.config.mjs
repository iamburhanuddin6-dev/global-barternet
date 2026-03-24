/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        serverComponentsExternalPackages: ['@xenova/transformers', 'onnxruntime-node'],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
