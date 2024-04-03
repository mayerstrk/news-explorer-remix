import process from 'node:process'
import dotenv from 'dotenv'

dotenv.config()

const enum EnvironmentVariables {
  API_URL = 'API_URL',
  COOKIE_SECRET = 'COOKIE_SECRET',
}

const environmentVariables = {
  [EnvironmentVariables.API_URL]:
    process.env.API_URL || 'http://127.0.0.1:3000',
  [EnvironmentVariables.COOKIE_SECRET]:
    process.env.COOKIE_SECRET ||
    '753516098931c6b45a1dd45a6c09bc215835623666f70aadbb658f947582b1c6',
}

export { EnvironmentVariables, environmentVariables as env }
