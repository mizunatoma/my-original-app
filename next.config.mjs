/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000, // １秒ごとにファイルの変更をチェックする
      aggregateTimeout: 300,
    }
    return config
  },
};

export default nextConfig;
