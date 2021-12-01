import fetch from "node-fetch";
import { BreedsMessage, BreedsResponse } from "../domain/breed.domain";
import { BreedLabels } from "../enums/common.enums";
import { InitService } from "./init.service";

// Breeds service to make external api call: GET, POST, PUT, DELETE
export class BreedsService {
  host = "";

  constructor() {
    this.host = new InitService().getParams(BreedLabels.host);
  }

  async getBreeds(): Promise<BreedsMessage> {
    return this.makeRequest("api/breeds/list/all");
  }

  async makeRequest(endpoint: string): Promise<BreedsMessage> {
    const url = `${this.host}${endpoint}`;
    const rawRes = await fetch(url, { timeout: 5000 });
    const { status, message }: BreedsResponse = await rawRes.json();
    if (!!status && status !== "success") {
      throw new Error("Error returned from api");
    }
    return message;
  }
}
