import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'

import { AppModule } from './app.module'

const PORT = process.env.PORT || 3000

async function bootstrap () {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  await app.listen(PORT)
  Logger.log(`Started on port ${PORT}.`, 'Bootstrap')
}
bootstrap()
