import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'

import { AppModule } from './app.module'

const PORT = parseInt(process.env.PORT ?? '8080', 10)

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  await app.listen(PORT)
}

bootstrap()
  .then(() => {
    Logger.log(`Started on port ${PORT}.`, 'Bootstrap')
  })
  .catch((error) => {
    Logger.error(error, 'Bootstrap')
  })
