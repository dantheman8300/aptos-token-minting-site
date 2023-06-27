/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    PRIV_KEY: process.env.PRIV_KEY,
    COLLECTION_OWNER_ACCOUNT: process.env.COLLECTION_OWNER_ACCOUNT,
    COLLECTION_ADDRESS: process.env.COLLECTION_ADDRESS,
    COLLECTION_NAME: process.env.COLLECTION_NAME,
    COLLECTION_DESCRIPTION: process.env.COLLECTION_DESCRIPTION,
    COLLECTION_TOKEN_NAME: process.env.COLLECTION_TOKEN_NAME,
    TWITTER_URL: process.env.TWITTER_URL,
    DISCORD_URL: process.env.DISCORD_URL,
    GITHUB_URL: process.env.GITHUB_URL,

  },
  images: {
    domains: ['gateway.pinata.cloud', 'ipfs.io'],
  },
}

module.exports = nextConfig
