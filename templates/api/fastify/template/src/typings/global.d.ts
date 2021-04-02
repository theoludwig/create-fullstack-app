import type { Dialect } from 'sequelize'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      COMPOSE_PROJECT_NAME: string
      PORT: string
      HOST: string
      DATABASE_DIALECT: Dialect
      DATABASE_HOST: string
      DATABASE_NAME: string
      DATABASE_USER: string
      DATABASE_PASSWORD: string
      DATABASE_PORT: string
      NODE_ENV: 'development' | 'production' | 'test'
      npm_package_version: string
    }
  }
}
