import swaggerJsDoc from 'swagger-jsdoc'

// Extended: https://swagger.io/specification/#infoObject
export const swaggerSpec = swaggerJsDoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      description: 'API',
      version: process.env.npm_package_version
    },
    basePath: '/',
    host: process.env.API_BASE_URL,
    tags: [{ name: 'users' }]
  },
  apis: ['./src/services/**/__docs__/**/*.yaml']
})
