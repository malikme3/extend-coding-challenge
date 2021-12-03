interface Response {
  message: string | Message
  status: 'success' | 'failed'
}
export interface ErrorResponse extends Response {
  statusCode: number
}

// response from external API package
export interface BreedsApiResponse extends Response {
  code?: number
}

// response for front-end client
export interface BreedsResponse {
  statusCode: number
  status: 'success' | 'failed'
  body: Breeds | string
}
export interface Message {
  [key: string]: string[]
}
export interface Breeds {
  breeds: string[]
}
export interface ParamStore {
  [key: string]: string
}
