import { Context, Handler } from "aws-lambda/handler";
import { BreedsController } from "../controllers/breeds.controller";
import { Breeds, GetBreedsResponse } from "../domain/breed.domain";
import { LogsService } from "../services/logs.service";
import { CommonUtils } from "../utils/breeds.utils";

const getBreedsHandler: Handler = async (
  event: any,
  context: Context
): Promise<GetBreedsResponse | any> => {
  let getBreedsResponse: GetBreedsResponse;
  let breeds: Breeds;

  // warn if lambda timeout is with in  3 seconds
  const timer = CommonUtils.requestTimeWarning(context);

  LogsService.log("info", `request event: ${JSON.stringify(event)}`);
  try {
    // controller call
    breeds = await new BreedsController().getBreeds();

    getBreedsResponse = {
      statusCode: 200,
      body: breeds,
      message: "success",
    };
  } catch (error) {
    LogsService.log("error", `api: ${context.functionName}, error:${error}`);
    getBreedsResponse = {
      statusCode: error.code || 500,
      body: error,
      message: "failed",
    };
  } finally {
    clearTimeout(timer);
  }
  //TODO: sanitization for sensitive data
  LogsService.log("info", `${context.functionName} resp: ${getBreedsResponse}`);
  return getBreedsResponse;
};

export { getBreedsHandler };
