import fetch from 'node-fetch'
import { getRandomBreedHandler } from '../../handlers/get-random-breed.handler'
import context = require('aws-lambda-mock-context')

jest.mock('node-fetch')
const mockedFetch: jest.Mock = fetch as any
const ctx = context()

describe('getRandomBreedHandler() tests', () => {
  const mockPayload = {}
  beforeEach(() => {
    mockedFetch.mockReturnValueOnce({
      json: () => {
        return mockPayload
      },
    })
  })

  it('returns payload from fetch request', async () => {
    const response: any = await getRandomBreedHandler({} as any, ctx, {} as any)
    expect(response.statusCode).toBe(404)
  })
})
