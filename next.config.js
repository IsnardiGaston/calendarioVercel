/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.strapiapp.com' },
      { protocol: 'https', hostname: '**.media.strapiapp.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Allow the isndesign portfolio to embed this site as a live preview.
          // CSP frame-ancestors supersedes X-Frame-Options in modern browsers,
          // so we use it instead of the deny-all SAMEORIGIN value.
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://isndesign.com https://*.isndesign.com",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
