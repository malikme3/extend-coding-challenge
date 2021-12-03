import { Context } from 'aws-lambda'
import { ErrorService } from '../services/errors.service'
import { LogsService } from '../services/logs.service'

export class CommonUtils {
  static requestTimeWarning(context: Context): NodeJS.Timeout {
    const timer = setTimeout(() => {
      LogsService.log('warn', `${context.functionName} API is going to timeout in 1 seconds!`)
      // throwing timeout error. Manually handling  before lambda timeout happens
      throw ErrorService.timeoutError('Lambda will be time out in 1 seconds.')
    }, context.getRemainingTimeInMillis() - 1 * 1000)
    return timer
  }
}
