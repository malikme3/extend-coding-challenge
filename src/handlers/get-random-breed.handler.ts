import { APIGatewayEvent, Context, Handler } from 'aws-lambda'
import { BreedsController } from '../controllers/breeds.controller'
import { BreedsResponse, ErrorResponse } from '../domain/breed.domain'
import { LogsService } from '../services/logs.service'
import { CommonUtils } from '../utils/breeds.utils'

// GET random breed handler
const getRandomBreedHandler: Handler = async (
  event: APIGatewayEvent,
  context: Context,
): Promise<BreedsResponse | ErrorResponse> => {
  let getBreedsResponse: BreedsResponse | ErrorResponse
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
    getBreedsResponse = {
      statusCode: error.code || 500,
      body: error.message || error,
      status: 'failed',
    }
  } finally {
    clearTimeout(timer)
  }
  return getBreedsResponse
}

export { getRandomBreedHandler }
