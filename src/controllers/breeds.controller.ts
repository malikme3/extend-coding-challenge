import { BreedsList } from "../domain/breed.domain";
import { BreedsService } from "../services/breeds.service";
import { InitService } from "../services/init.service";
import { LogsService } from "../services/logs.service";

export class BreedsController {
  constructor() {
    // Initialize init service
    new InitService();
  }

  async getBreeds(): Promise<BreedsList> {
    try {
      // API call to get breeds list
      return await new BreedsService().getBreeds();
    } catch (error) {
      LogsService.log("error", error);
      return error;
    }
  }
}
