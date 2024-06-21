/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        appDir: true, // Ensure appDir is enabled for App Router
    },
    output: 'standalone', // Required for serverless deployment
    images: {
        remotePatterns: [
            {
                hostname: 'avatars.githubusercontent.com'
            },
            {
                hostname: 'lh3.googleusercontent.com'
            },
            {
                hostname: 'res.cloudinary.com'
            }
        ]
    }
};

export default nextConfig;
