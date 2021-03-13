import { Router } from 'express'

import { signupRouter } from './signup/post'

export const usersRouter = Router()

usersRouter.use('/', signupRouter)
