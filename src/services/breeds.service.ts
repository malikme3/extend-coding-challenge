import fetch from 'node-fetch'
import { Message, BreedsApiResponse } from '../domain/breed.domain'
import { BreedsKeys } from '../enums/common.enums'
import { InitService } from './init.service'
import { LogsService } from './logs.service'

// Breeds service to make external api call: GET, POST, PUT, DELETE
export class BreedsService {
  async getBreeds(): Promise<Message> {
    return this.apiRequest('api/breeds/list/all')
  }

  // return message data from API response
  apiRequest = async (endpoint: string): Promise<Message> => {
    const host = InitService.getInstance().getParams(BreedsKeys.host)
    const url = `${host}${endpoint}`
    LogsService.log('info', `api url: ${url}`)
    // TODO: HTTPResponseError for error handling
    const apiResp = await fetch(url, { timeout: 3000 })
    const { status, code, message = {} }: BreedsApiResponse = await apiResp?.json()
    if (!!status && status !== 'success') {
      const errorMsg = `Error while getting breeds with status:${status}, code:${code}, message:${message}`
      throw new Error(errorMsg)
    }
    return message
  }
}
