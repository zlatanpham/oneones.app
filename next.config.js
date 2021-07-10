require('dotenv').config();

module.exports = {
  env: {},
  webpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.resolve.alias['react'] = 'preact/compat';
      config.resolve.alias['react-dom'] = 'preact/compat';
      config.resolve.alias['react-ssr-prepass'] = 'preact-ssr-prepass';
    }

    return config;
  },
};
