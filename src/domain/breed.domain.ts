export interface Breeds {
  breeds: string[];
}
// object definition Lambda response
export interface GetBreedsResponse {
  statusCode: number;
  body: Breeds;
  message?: string;
}
// object definition from API response
export interface BreedsApiResponse {
  message: Message;
  status: string;
  code?: number;
}

export interface Message {
  [key: string]: string[];
}

export interface ParamStore {
  [key: string]: string;
}
