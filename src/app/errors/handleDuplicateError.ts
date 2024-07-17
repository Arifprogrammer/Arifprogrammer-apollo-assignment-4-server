import { TErrorSources, TGenericErrorResponse } from '../interface/error'
import httpStatus from 'http-status'

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/)

  // The extracted value will be in the first capturing group
  const extractedMessage = match?.[1]

  const errorSources: TErrorSources[] = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ]

  const statusCode = httpStatus.BAD_REQUEST

  return {
    statusCode,
    message: 'Duplicate Entry',
    errorSources,
  }
}

export default handleDuplicateError
