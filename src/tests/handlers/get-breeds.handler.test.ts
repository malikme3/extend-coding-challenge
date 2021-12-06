import fetch from 'node-fetch'
import * as context from 'aws-lambda-mock-context'
import { getBreedsHandler } from '../../handlers/get-breeds.handler'
import { Breeds, BreedsResponse, ErrorResponse } from '../../domain/breed.domain'

jest.mock('node-fetch')
const mockedFetch: jest.Mock = fetch as any
const ctx = context()
// mock data
const mockApiData = {
  message: {
    brabancon: [],
    briard: [],
    buhund: ['norwegian'],
    bulldog: ['boston', 'english', 'french'],
  },
  status: 'success',
}

const mockResponse = [
  'brabancon',
  'briard',
  'norwegian buhund',
  'boston bulldog',
  'english bulldog',
  'french bulldog',
]

describe('getBreedsHandler() lambda tests', () => {
  it('should return success response   ', async () => {
    mockedFetch.mockReturnValueOnce({
      json: () => {
        return mockApiData
      },
    })
    const { statusCode, body }: BreedsResponse<Breeds> = await getBreedsHandler({}, ctx, {} as any)
    expect(statusCode).toBe(200)
    expect(mockResponse).toMatchObject(body)
  })

  it('should return notFound response   ', async () => {
    mockedFetch.mockReturnValueOnce({
      json: () => {
        return []
      },
    })
    const { statusCode }: BreedsResponse<Breeds> = await getBreedsHandler({}, ctx, {} as any)
    expect(statusCode).toBe(404)
  })
  it('should return server error response   ', async () => {
    mockedFetch.mockReturnValueOnce({
      json: () => {
        throw new Error('Server is down')
      },
    })
    const { statusCode, status, body }: ErrorResponse = await getBreedsHandler({}, ctx, {} as any)
    expect(statusCode).toBe(500)
    expect(status).toBe('failed')
    expect(body).toMatch(/Server is down/)
  })
  it('timeout test', async () => {
    mockedFetch.mockReturnValueOnce({
      json: () => {
        throw new Error('timeout')
      },
    })
    const { statusCode, status, body }: ErrorResponse = await getBreedsHandler({}, ctx, {} as any)
    expect(statusCode).toBe(408)
    expect('failed').toBe(status)
    expect('request failed due to Error: timeout').toBe(body)
  })
})
