const path = require('path')
const id = Math.random().toString(32).slice(2);
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [process.env.NEXT_BACKEND_URL, "localhost:3000"]
    }
  },
  output: 'standalone',
  reactStrictMode: false,
  productionBrowserSourceMaps: false,
  async rewrites() {
    return [
      {
        source: "/apibe/:path*",
        destination: process.env.NEXT_BACKEND_URL+"/api/:path*",
      },
    ];
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // compress: true,
  // images: {
  //   imageSizes: [100, 140, 200, 280],
  //   minimumCacheTTL: 86400,
  //   domains: ['localhost'],
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: '**',
  //     },
  //     {
  //       protocol: 'http',
  //       hostname: 'localhost',
  //     },
  //   ],
  // },
  // modularizeImports: {
  //   lodash: {
  //     transform: 'lodash/{{member}}',
  //     preventFullImport: true,
  //   },
  // },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: { removeViewBox: false },
                  },
                },
                // {
                //   name: 'cleanupIDs', // Prevent id collision
                //   params: {
                //     prefix: {
                //       toString() {
                //         this.counter = this.counter || 0;
                //         return `id-${this.counter++}`;
                //       },
                //     },
                //   },
                // },
                // {
                //   name: 'prefixIds',
                //   params: {
                //     // Use that ID here.
                //     // Do NOT generate the ID itself in the "prefix" function
                //     // because that will result in each ID being unique,
                //     // breaking the gradient references within a single SVG.
                //     prefix: id,
                //   },
                // },
              ],
            },
          },
        },
      ],
    });
    return config;
  },
}

module.exports = nextConfig