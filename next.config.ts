import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    // Keep your existing externals
    if (!config.externals) config.externals = [];
    config.externals.push("pino-pretty", "lokijs", "encoding");

    if (dev) {
      config.cache = {
        type: "filesystem", // cache to disk
        version: "1.0",
        cacheDirectory: path.resolve(__dirname, ".next/cache/webpack"),
        buildDependencies: {
          config: [__filename],
        },
        store: "pack",
      };

      config.infrastructureLogging = {
        level: "error", // reduce warnings
      };
    }

    return config;
  },
};

export default nextConfig;
