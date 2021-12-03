import { Breeds, BreedsResponse } from '../domain/breed.domain'
import { BreedsService } from '../services/breeds.service'
import { ErrorService } from '../services/errors.service'
import { InitService } from '../services/init.service'
import { LogsService } from '../services/logs.service'

export class BreedsController {
  constructor() {
    // Initialize init service
    InitService.getInstance()
  }

  // TODO: request params validation for requests
  async getBreeds(): Promise<BreedsResponse | Error> {
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
      return this.successResponse({ breeds })
    } catch (error) {
      LogsService.log('error', error)
      // for timeout
      if (error.toString().includes('timeout')) {
        return ErrorService.timeoutError(error)
      }
      return ErrorService.serverError(error)
    }
  }

  async getRandomBreed(): Promise<BreedsResponse | Error> {
    try {
      // API call to get random breed
      const randomBreedsResponse = await new BreedsService().getRandomBreed()

      // not found case
      if (!randomBreedsResponse || Object.keys(randomBreedsResponse).length < 1) {
        return ErrorService.notFoundError('RandomBreed')
      }
      return this.successResponse(randomBreedsResponse)
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
  private successResponse = (breeds: Breeds | string): BreedsResponse => {
    return {
      statusCode: 200,
      body: breeds,
      message: 'success',
    }
  }
}
