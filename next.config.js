/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        hostname: "dev-to-uploads.s3.amazonaws.com",
      },
    ],
  },
};

export default config;
