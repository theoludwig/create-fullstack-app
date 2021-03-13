import type { Dialect } from 'sequelize'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      COMPOSE_PROJECT_NAME: string
      PORT: string
      API_BASE_URL: string
      DATABASE_DIALECT: Dialect
      DATABASE_HOST: string
      DATABASE_NAME: string
      DATABASE_USER: string
      DATABASE_PASSWORD: string
      DATABASE_PORT: string
      JWT_ACCESS_EXPIRES_IN: string
      JWT_ACCESS_SECRET: string
      JWT_REFRESH_SECRET: string
      DISCORD_CLIENT_ID: string
      DISCORD_CLIENT_SECRET: string
      GITHUB_CLIENT_ID: string
      GITHUB_CLIENT_SECRET: string
      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string
      EMAIL_HOST: string
      EMAIL_USER: string
      EMAIL_PASSWORD: string
      EMAIL_PORT: string
      NODE_ENV: 'development' | 'production' | 'test'
      npm_package_version: string
    }
  }
}
