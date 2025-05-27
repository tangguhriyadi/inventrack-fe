/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true, // This sets 308 status code
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "umkm-dev.oss-ap-southeast-5.aliyuncs.com",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },

};

export default nextConfig;
