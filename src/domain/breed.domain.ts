// response for front-end client
export interface BreedsResponse {
  statusCode: number
  body: Breeds | string
  message?: string
}

// response from external API package
export interface BreedsApiResponse {
  message: string | Message
  status: string
  code?: number
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
