import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'

import { swaggerSpec } from '../../tools/config/swaggerSpec'

export const docsRouter = Router()

docsRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
