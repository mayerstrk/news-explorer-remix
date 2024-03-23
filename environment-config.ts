import process from 'node:process'
import dotenv from 'dotenv'

dotenv.config()

const enum EnvironmentVariables {
  API_URL = 'API_URL',
}

const environmentVariables = {
  [EnvironmentVariables.API_URL]:
    process.env.API_URL || 'http://127.0.0.1:3000',
}

export { EnvironmentVariables, environmentVariables as env }
