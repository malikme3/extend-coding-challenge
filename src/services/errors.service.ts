import { ErrorResponse } from '../domain/breed.domain'

// custom error handling
export class ErrorService extends Error {
  static serverError(error: string): ErrorResponse {
    return {
      statusCode: 500,
      message: `request failed due to ${error}`,
      status: `failed`,
    }
  }

  static notFoundError(entity: string): ErrorResponse {
    return {
      statusCode: 404,
      message: `${entity} not found`,
      status: `failed`,
    }
  }

  static timeoutError(error: string): ErrorResponse {
    return {
      statusCode: 408,
      message: `request failed due to ${error}`,
      status: `failed`,
    }
  }

  // TODO : additional errors
}
