import withPWA from "next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // other next config options can go here
  images: {
    domains: ["openweathermap.org"],
  },
};

const pwa = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [/middleware-manifest\.json$/],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.openweathermap\.org\/.*$/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "openweather-api-cache",
        expiration: { maxEntries: 50, maxAgeSeconds: 24 * 60 * 60 },
        networkTimeoutSeconds: 10,
      },
    },
    {
      urlPattern: /.*/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "others",
        expiration: { maxEntries: 200 },
      },
    },
  ],
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (pwa as unknown as (c: any) => any)(nextConfig);
