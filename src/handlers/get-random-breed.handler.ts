import { APIGatewayEvent, Context, Handler } from 'aws-lambda'
import { BreedsController } from '../controllers/breeds.controller'
import { Breed, BreedsResponse, ErrorResponse } from '../domain/breed.domain'
import { ErrorService } from '../services/errors.service'
import { LogsService } from '../services/logs.service'
import { CommonUtils } from '../utils/breeds.utils'

// GET random breed handler
const getRandomBreedHandler: Handler = async (
  event: APIGatewayEvent,
  context: Context,
): Promise<BreedsResponse<Breed> | ErrorResponse> => {
  let getBreedsResponse: BreedsResponse<Breed> | ErrorResponse
  // warning log statement if lambda timeout is with in  3 seconds
  const timer = CommonUtils.requestTimeWarning(context)
  LogsService.log('info', `request event: ${JSON.stringify(event)}`)
  try {
    // controller call
    getBreedsResponse = await new BreedsController().getRandomBreed()
    // TODO: response sanitization for sensitive data
    LogsService.log('info', `${context.functionName} resp: ${JSON.stringify(getBreedsResponse)}`)
  } catch (error) {
    LogsService.log('error', `api: ${context.functionName}, error:${error}`)
    return ErrorService.serverError(error)
  } finally {
    clearTimeout(timer)
  }
  return getBreedsResponse
}

export { getRandomBreedHandler }
