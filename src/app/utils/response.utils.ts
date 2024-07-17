import { Response } from 'express'

export function respond(
  res: Response,
  input: {
    data?: unknown
    success: boolean
    code: number
    message?: string
    [key: string]: unknown
  },
) {
  const { data, code, message, success } = input

  return res.status(code).json({
    success,
    message,
    data,
  })
}
