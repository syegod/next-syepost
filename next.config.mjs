/** @type {import('next').NextConfig} */

const nextConfig = {
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
