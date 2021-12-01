export interface ParamStore {
  [key: string]: string;
}

// export interface Response {
//   statusCode: number;
// }

export interface BreedsList {
  [key: string]: string[];
}

export interface BreedsResponse {
  message: BreedsList;
  status: string;
  code?: number;
}

export interface GetBreedsResponse {
  statusCode: number;
  body: string[];
  message?: string;
}
