import { Context, Handler } from "aws-lambda/handler";
import { BreedsController } from "../controllers/breeds.controller";

const getBreeds: Handler = async (event: any, context: Context) => {
  console.log("Error in lambda event", event);
  console.log("Error in lambda context ", context.functionName);

  let breeds = {};
  try {
    breeds = await new BreedsController().getBreeds();
  } catch (error) {
    // error
  }

  return {
    statusCode: 200,
    body: breeds,
    message: "success",
  };
};

export { getBreeds };
