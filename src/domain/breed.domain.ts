// response from external API package
export interface BreedsApiResponse {
  message: string | Message
  status: 'success' | 'failed'
  code?: number
}
export interface Message {
  [key: string]: string[]
}

// response for front-end client
// T generic type for  Breeds, Breed and error string
export type T = Breed | Breeds | string
export interface BreedsResponse<T> {
  statusCode: number
  status: 'success' | 'failed'
  body: T
}
export type Breed = string
export type Breeds = Breed[]
// error response definition
export type ErrorResponse = BreedsResponse<string>
// params store/secret manger definition
export interface ParamStore {
  [key: string]: string
}
