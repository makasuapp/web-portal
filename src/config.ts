const ENV_VARS = {
  development: {
    API_SERVER_URL: 'http://localhost:3001',
  },
  test: {
    API_SERVER_URL: 'http://localhost:3001',
  },
  production: {
    API_SERVER_URL: 'https://api.makasu.co',
  },
}

const env = process.env.NODE_ENV
let envSpecificConfigs
if (env === 'production' || env === 'development' || env === 'test') {
  envSpecificConfigs = ENV_VARS[env]
} else {
  envSpecificConfigs = ENV_VARS.production
}

const DEFAULT_ENV_VARS = {
  env,
}

const CONFIG = { ...DEFAULT_ENV_VARS, ...envSpecificConfigs }

export { CONFIG as default }
