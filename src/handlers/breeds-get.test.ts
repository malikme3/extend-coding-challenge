import fetch from 'node-fetch'
import { handler } from './breeds-get'
import { GetBreedsResponse } from '../lambdas/types'

const mockedFetch: jest.Mock = fetch as any

jest.mock('node-fetch')

describe('breeds-get handler', () => {
  const mockPayload = {
    message: {
      affenpinscher: [],
      african: [],
      airedale: [],
      akita: [],
      appenzeller: [],
      australian: ['shepherd'],
      bulldog: ['boston', 'english', 'french'],
    },
    status: 'success',
  }
  const mockResponse = [
    'affenpinscher',
    'african',
    'airedale',
    'akita',
    'appenzeller',
    'shepherd australian',
    'boston bulldog',
    'english bulldog',
    'french bulldog',
  ]
  beforeEach(() => {
    mockedFetch.mockReturnValueOnce({
      json: () => {
        return mockPayload
      },
    })
  })

  it('returns payload from fetch request', async () => {
    const { statusCode, body }: GetBreedsResponse = await handler()
    expect(statusCode).toBe(200)
    if (body) {
      expect(mockResponse).toMatchObject(body)
    }
  })
})

describe('breeds-get handler error scenario test', () => {
  it('timeout test', async () => {
    mockedFetch.mockReturnValueOnce({
      json: () => {
        throw new Error('timeout')
      },
    })
    const { statusCode, message }: GetBreedsResponse = await handler()
    expect(statusCode).toBe(408)
    if (message) {
      expect('Request Timeout').toBe(message)
    }
  })

  it('Internal server error', async () => {
    mockedFetch.mockReturnValueOnce({
      json: () => {
        throw new Error('Internal server')
      },
    })
    const { statusCode, message }: GetBreedsResponse = await handler()
    expect(statusCode).toBe(500)
    if (message) {
      expect('Something went wrong').toBe(message)
    }
  })
})
