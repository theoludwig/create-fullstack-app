import { Type } from '@sinclair/typebox'

export const date = {
  createdAt: Type.String({
    format: 'date-time',
    description: 'Created date time'
  }),
  updatedAt: Type.String({
    format: 'date-time',
    description: 'Last updated date time'
  })
}

export const id = Type.Integer({ minimum: 1, description: 'Unique identifier' })

export const fastifyErrors = {
  400: Type.Object({
    statusCode: Type.Literal(400),
    error: Type.Literal('Bad Request'),
    message: Type.String()
  }),
  404: Type.Object({
    statusCode: Type.Literal(404),
    error: Type.Literal('Not Found'),
    message: Type.Literal('Not Found')
  }),
  500: {
    statusCode: Type.Literal(500),
    error: Type.Literal('Internal Server Error'),
    message: Type.Literal('Something went wrong')
  }
}
