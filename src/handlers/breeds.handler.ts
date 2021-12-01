import { Context, Handler } from "aws-lambda/handler";
import { BreedsController } from "../controllers/breeds.controller";
import { BreedsList, GetBreedsResponse } from "../domain/breed.domain";
import { LogsService } from "../services/logs.service";
import { CommonUtils } from "../utils/ breeds.utils";

const getBreedsHandler: Handler = async (
  event: any,
  context: Context
): Promise<GetBreedsResponse | any> => {
  LogsService.log("warn", `request event: ${JSON.stringify(event)}`);

  let breeds: BreedsList;
  // warn if lambda timeout is with in  3 seconds
  const timer = CommonUtils.requestTimeWarning(context);
  try {
    breeds = await new BreedsController().getBreeds();
    return {
      statusCode: 200,
      body: breeds,
      message: "success",
    };
  } catch (error) {
    LogsService.log("error", `api: ${context.functionName}, error:${error}`);
    return {
      statusCode: error.code || 500,
      body: error,
      message: "failed",
    };
  } finally {
    clearTimeout(timer);
  }
};

export { getBreedsHandler };
