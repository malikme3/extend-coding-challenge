import fetch from "node-fetch";
import { BreedsList, BreedsResponse } from "../domain/breed.domain";
import { BreedLabels } from "../enums/common.enums";
import { InitService } from "./init.service";

// Breeds service to make external api call: GET, POST, PUT, DELETE
export class BreedsService {
  host = "";

  constructor() {
    this.host = new InitService().getParams(BreedLabels.host);
  }

  async getBreeds(): Promise<BreedsList> {
    return this.makeRequest("api/breeds/list/all");
  }

  async makeRequest(endpoint: string): Promise<BreedsList> {
    const url = `${this.host}${endpoint}`;
    console.log(url);
    const rawRes = await fetch(url, { timeout: 5000 });
    const { status, message, code }: BreedsResponse = await rawRes.json();
    if (!!status && status !== "success") {
      const errorMsg = `Error while getting breeds with status:${status}, code:${code}, message:${message}`;
      throw new Error(errorMsg);
    }
    return !!message as any;
  }
}
