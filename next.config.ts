/// next.config.js

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "downloads.ctfassets.net",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
