import { Context } from "aws-lambda";
import { LogsService } from "../services/logs.service";

export class CommonUtils {
  static requestTimeWarning(context: Context): NodeJS.Timeout {
    const timer = setTimeout(() => {
      LogsService.log(
        "warn",
        `${context.functionName} API is going to timeout in 3 seconds!`
      );
    }, context.getRemainingTimeInMillis() - 3 * 1000);
    return timer;
  }
}
