/** @type {import('next').NextConfig} */
// import withPlaiceholder from "@plaiceholder/next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        pathname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};
module.exports = nextConfig;

// export default withPlaiceholder(nextConfig);
