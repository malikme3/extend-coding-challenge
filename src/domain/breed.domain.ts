export interface ParamStore {
  [key: string]: string;
}

export interface Response {
  statusCode: number;
}

export interface BreedsMessage {
  [key: string]: string[];
}

export interface BreedsResponse {
  message: BreedsMessage;
  status: string;
}

export interface GetBreedsResponse {
  statusCode: number;
  body?: string[];
  message?: string;
}
