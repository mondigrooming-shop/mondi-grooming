/** @type {import'next'].NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "eaas01-ga.myshopify.com" },
    ],
  },
  // Force dynamic rendering for fresh product data
  experimental: {},
};

module.exports = nextConfig;

