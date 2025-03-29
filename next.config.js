/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "amazon.com",
      "uber.com",
      "flipkart.com",
      "swiggy.com",
      "zomato.com",
    ],
    unoptimized: true,
    disableStaticImages: false,
  },
};

module.exports = nextConfig;
