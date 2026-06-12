/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      ...(config.watchOptions || {}),
      ignored: [
        '**/.git/**',
        '**/node_modules/**',
        '/hiberfil.sys/',
        '/swapfile.sys/',
        '/pagefile.sys/',
        '/DumpStack.log.tmp/',
        '/DumpStack.log/',
        'C:\\hiberfil.sys',
        'C:\\swapfile.sys',
        'C:\\pagefile.sys',
        'C:\\DumpStack.log.tmp',
        'C:\\DumpStack.log',
      ],
    };
    return config;
  },
}

export default nextConfig
