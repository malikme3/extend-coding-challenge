import { APIGatewayEvent, Context, Handler } from 'aws-lambda'
import { BreedsController } from '../controllers/breeds.controller'
import { GetBreedsResponse } from '../domain/breed.domain'
import { LogsService } from '../services/logs.service'
import { CommonUtils } from '../utils/breeds.utils'

const getBreedsHandler: Handler = async (
  event: APIGatewayEvent,
  context: Context,
): Promise<GetBreedsResponse | Error> => {
  let getBreedsResponse: GetBreedsResponse | Error
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

export { getBreedsHandler }
