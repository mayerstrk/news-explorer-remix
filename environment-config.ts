import process from 'node:process'
import dotenv from 'dotenv'

dotenv.config()

const enum EnvironmentVariables {
  API_URL = 'API_URL',
}

const environmentVariables = {
  [EnvironmentVariables.API_URL]:
    process.env.API_URL ||
    'https://news-explorer-api-83c2fdf9d164.herokuapp.com/',
}

export { EnvironmentVariables, environmentVariables as env }
