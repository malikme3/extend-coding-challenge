import { Breed, Breeds, BreedsResponse, ErrorResponse } from '../domain/breed.domain'
import { BreedsService } from '../services/breeds.service'
import { ErrorService } from '../services/errors.service'
import { InitService } from '../services/init.service'
import { LogsService } from '../services/logs.service'

export class BreedsController {
  private statusCode = 200

  constructor() {
    // Initialize init service
    InitService.getInstance()
  }

  // TODO: request params validation for requests
  async getBreeds(): Promise<BreedsResponse<Breeds> | ErrorResponse> {
    try {
      // API call to get breeds list
      const breedsResponse = await new BreedsService().getBreeds()
      const respDataLength = Object.keys(breedsResponse).length
      // not found
      if (respDataLength < 1) {
        return ErrorService.notFoundError('breeds')
      }

      const breeds: string[] = Object.keys(breedsResponse).reduce(
        (result: string[], key: string): string[] => {
          const subBreeds: string[] = breedsResponse[key]
          return [
            ...result,
            ...(subBreeds.length > 0 ? subBreeds.map((val) => `${val} ${key}`) : [key]),
          ]
        },
        [], // default/initial value
      )
      return this.successResponse<Breeds>(breeds)
    } catch (error) {
      LogsService.log('error', error)
      // for timeout
      if (error.toString().includes('timeout')) {
        return ErrorService.timeoutError(error)
      }
      return ErrorService.serverError(error)
    }
  }

  async getRandomBreed(): Promise<BreedsResponse<Breed> | ErrorResponse> {
    try {
      // API call to get random breed
      const randomBreedsResponse = await new BreedsService().getRandomBreed()

      // not found case
      if (!randomBreedsResponse || Object.keys(randomBreedsResponse).length < 1) {
        return ErrorService.notFoundError('RandomBreed')
      }
      return this.successResponse<Breed>(randomBreedsResponse)
    } catch (error) {
      LogsService.log('error', error)
      // for timeout
      if (error.toString().includes('timeout')) {
        return ErrorService.timeoutError(error)
      }
      return ErrorService.serverError(error)
    }
  }

  // success response
  private successResponse<T>(breeds: T): BreedsResponse<T> {
    const { statusCode } = this
    return {
      statusCode,
      body: breeds,
      status: 'success',
    }
  }
}
