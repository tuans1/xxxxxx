/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    basePath: process.env.BASE_PATH || '/vsm',
    transpilePackages: [
        '@ocean-network-express/magenta-react-dates',
        '@ocean-network-express/magenta-react',
        '@ocean-network-express/om-ui'
    ],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'nextjs.org',
                port: '',
                pathname: '/icons/**'
            }
        ]
    },
    async rewrites() {
        return [
            {
                source: '/chorus/:path*',
                destination: 'https://chorus-dev.one-line.com/chorus/:path*',
                basePath: false
            },
            {
                source: `${process.env.BASE_PATH || '/vsm'}/chorus/:path*`,
                destination: 'https://chorus-dev.one-line.com/chorus/:path*',
                basePath: false
            }
        ];
    }
};

export default nextConfig;
