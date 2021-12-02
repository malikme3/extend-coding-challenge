// custom error handling
export class ErrorService {
  static notFoundError(entity: string): Error {
    const err: any = new Error();
    err["statusCode"] = 404;
    err["message"] = `${entity} not found`;
    return err;
  }

  static serverError(error: string): Error {
    const err: any = new Error();
    err["message"] = `request failed due to ${error}`;
    err["statusCode"] = 500;
    return err;
  }
  static timeoutError(error: string): Error {
    const err: any = new Error();
    err["message"] = `request failed due to ${error}`;
    err["statusCode"] = 408;
    return err;
  }

  //TODO : additional errors
}
