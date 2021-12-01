import { BreedsMessage } from "../domain/breed.domain";
import { BreedsService } from "../services/breeds.service";
import { InitService } from "../services/init.service";

export class BreedsController {
  constructor() {
    // Initialize init service
    new InitService();
  }
  async getBreeds() {
    let breedsRes: BreedsMessage = {};
    try {
      // API call to get breeds data
      breedsRes = await new BreedsService().getBreeds();
    } catch (error) {}
    return breedsRes;
  }
}
