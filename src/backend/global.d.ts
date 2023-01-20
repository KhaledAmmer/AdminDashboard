declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT: string;
    MONGODB_CONNECTION_STRING: string;
  }
}
