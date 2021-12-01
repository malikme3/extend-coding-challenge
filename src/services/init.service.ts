import { ParamStore } from "../domain/breed.domain";
export class InitService {
  paramStore: ParamStore = {};

  constructor() {
    this.getSsmParams();
  }
  //function to get ssm params to load in App Param configs
  getSsmParams(): void {
    // get params from SSM param store
    this.paramStore = mockParams;
    console.log("params from ssm");
  }

  getParams(key: string): string {
    return this.paramStore[key];
  }
}

const mockParams = {
  BREED_HOST: "https://dog.ceo/",
  BREED_USERNAME: "admin",
  BREED_PASSWORD: "xyshd",
};
