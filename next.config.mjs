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
    transpilePackages: ['framer-motion', 'motion-dom', 'motion-utils'],
};

export default nextConfig;
