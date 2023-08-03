/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects(){
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: false,
      }
    ]
  }
}

module.exports = nextConfig
