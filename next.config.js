/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // recommended
  webpack: (config) => {
    // Prevent duplicate THREE instances (important for R3F / @react-three/xr)
    config.resolve.alias = {
      ...config.resolve.alias,
      three: require.resolve('three'),
    }
    return config
  },
}

export default nextConfig
