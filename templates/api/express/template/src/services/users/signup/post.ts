import bcrypt from 'bcryptjs'
import { Request, Response, Router } from 'express'
import { body } from 'express-validator'

import { validateRequest } from '../../../tools/middlewares/validateRequest'
import User from '../../../models/User'
import { commonErrorsMessages } from '../../../tools/config/constants'
import { alreadyUsedValidation } from '../../../tools/validations/alreadyUsedValidation'

export const errorsMessages = {
  email: {
    mustBeValid: 'Email must be valid'
  }
}

export const signupRouter = Router()

signupRouter.post(
  '/users/signup',
  [
    body('email')
      .trim()
      .notEmpty()
      .isEmail()
      .withMessage(errorsMessages.email.mustBeValid)
      .custom(async (email: string) => {
        return await alreadyUsedValidation(User, 'email', email)
      }),
    body('name')
      .trim()
      .notEmpty()
      .isLength({ max: 30, min: 3 })
      .withMessage(
        commonErrorsMessages.charactersLength('name', { max: 30, min: 3 })
      ),
    body('password').trim().notEmpty().isString()
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body as {
      name: string
      email: string
      password: string
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await User.create({
      email,
      name,
      password: hashedPassword
    })
    return res.status(201).json({ user })
  }
)
