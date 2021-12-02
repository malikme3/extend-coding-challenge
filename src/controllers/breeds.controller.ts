import { Breeds } from "../domain/breed.domain";
import { BreedsService } from "../services/breeds.service";
import { InitService } from "../services/init.service";
import { LogsService } from "../services/logs.service";

export class BreedsController {
  constructor() {
    // Initialize init service
    InitService.getInstance();
  }
  //TODO: request params validation for requests
  async getBreeds(): Promise<Breeds> {
    try {
      // API call to get breeds list
      const breedsResponse = await new BreedsService().getBreeds();
      const respDataLength = Object.keys(breedsResponse).length;

      if (respDataLength < 1) {
        return { breeds: [] };
      }

      const breeds: string[] = Object.keys(breedsResponse).reduce(
        (result: string[], key: string): string[] => {
          const subBreeds: string[] = breedsResponse[key];
          return [
            ...result,
            ...(subBreeds.length > 0
              ? subBreeds.map((val) => `${val} ${key}`)
              : [key]),
          ];
        },
        [] // default/initial value
      );
      return { breeds };
    } catch (error) {
      LogsService.log("error", error);
      return error;
    }
  }
}
