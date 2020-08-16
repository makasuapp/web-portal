const ENV_VARS = {
  development: {
    API_SERVER_URL: 'http://localhost:3001',
  },
  test: {
    API_SERVER_URL: 'http://localhost:3001',
  },
  production: {
    API_SERVER_URL: 'https://api.makasu.co',
  }
};

const env = process.env.NODE_ENV
let env_specific_configs
if (env === 'production' || env === 'development' || env === 'test') {
  env_specific_configs = ENV_VARS[env];
} else {
  env_specific_configs = ENV_VARS.production;
}

const DEFAULT_ENV_VARS = {};

var CONFIG = Object.assign({}, DEFAULT_ENV_VARS, env_specific_configs);

export {CONFIG as default};
