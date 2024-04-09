import process from 'node:process'
import dotenv from 'dotenv'

dotenv.config()

const enum EnvironmentVariables {
  DB_API_URL = 'API_URL',
  NEWS_API_URL = 'NEWS_API_URL',
  NEWS_API_KEY = 'NEWS_API_KEY',
  COOKIE_SECRET = 'COOKIE_SECRET',
}

const environmentVariables = {
  [EnvironmentVariables.DB_API_URL]:
    process.env.API_URL || 'http://127.0.0.1:3000',
  [EnvironmentVariables.NEWS_API_URL]:
    process.env.NEWS_API_URL || 'https://newsapi.org/v2',
  [EnvironmentVariables.NEWS_API_KEY]:
    process.env.NEWS_API_KEY || 'f741b1ff072840b4aa8057bb1363a743',
  [EnvironmentVariables.COOKIE_SECRET]:
    process.env.COOKIE_SECRET ||
    '753516098931c6b45a1dd45a6c09bc215835623666f70aadbb658f947582b1c6',
}

export { EnvironmentVariables, environmentVariables as env }
