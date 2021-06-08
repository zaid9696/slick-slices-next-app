
const withImages = require('next-images');

const withFonts = require('next-fonts');

module.exports = withFonts(withImages({
  webpack(config, options) {
    return config
  },
  images: {
    domains: ['cdn.sanity.io', 'www.totalwine.com'],
  },
  target: 'serverless'
}))

