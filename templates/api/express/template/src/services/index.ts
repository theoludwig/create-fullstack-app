import { Router } from 'express'

import { docsRouter } from './docs'
import { usersRouter } from './users'

export const router = Router()

router.use(docsRouter)
router.use(usersRouter)
