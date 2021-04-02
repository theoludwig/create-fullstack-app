import { application } from './application'
import { sequelize } from './tools/database/sequelize'

const PORT = parseInt(process.env.PORT ?? '8080', 10)

const main = async (): Promise<void> => {
  await sequelize.sync()
  const address = await application.listen(PORT, process.env.HOST)
  console.log('\x1b[36m%s\x1b[0m', `🚀  Server listening at ${address}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
