import * as dotenv from 'dotenv';
dotenv.config();

interface ENV {
  NODE_ENV: string | undefined;
  PORT: number | undefined;
  MONGODB_CONNECTION_STRING: string | undefined;
}

interface Config {
  NODE_ENV: string;
  PORT: number;
  MONGODB_CONNECTION_STRING: string;
}

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,
  };
};

const getSanitizedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;
