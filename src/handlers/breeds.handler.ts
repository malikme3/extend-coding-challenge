import { APIGatewayEvent, Context, Handler } from 'aws-lambda'
import { BreedsController } from '../controllers/breeds.controller'
import { BreedsResponse } from '../domain/breed.domain'
import { LogsService } from '../services/logs.service'
import { CommonUtils } from '../utils/breeds.utils'

const getBreedsHandler: Handler = async (
  event: APIGatewayEvent,
  context: Context,
): Promise<BreedsResponse | Error> => {
  let getBreedsResponse: BreedsResponse | Error
  // warning log statement if lambda timeout is with in  3 seconds
  const timer = CommonUtils.requestTimeWarning(context)

  LogsService.log('info', `request event: ${JSON.stringify(event)}`)
  try {
    // controller call
    getBreedsResponse = await new BreedsController().getBreeds()
    // TODO: response sanitization for sensitive data
    LogsService.log('info', `${context.functionName} resp: ${JSON.stringify(getBreedsResponse)}`)
  } catch (error) {
    LogsService.log('error', `api: ${context.functionName}, error:${error}`)
    getBreedsResponse = {
      statusCode: error.code || 500,
      body: error.message || error,
      message: 'failed',
    }
  } finally {
    clearTimeout(timer)
  }
  return getBreedsResponse
}

// random breed handler
async function getRandomBreedHandler(
  event: APIGatewayEvent,
  context: Context,
): Promise<BreedsResponse | Error> {
  let getBreedsResponse: BreedsResponse | Error
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
      message: 'failed',
    }
  } finally {
    clearTimeout(timer)
  }
  return getBreedsResponse
}

export { getRandomBreedHandler }

export { getBreedsHandler }
