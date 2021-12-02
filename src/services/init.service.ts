import { ParamStore } from "../domain/breed.domain";
// import * as a from "../../configs/dev.config.json";
import * as fs from "fs";
import * as path from "path";
export class InitService {
  static instance: InitService;
  static paramStore: ParamStore = {};

  private constructor() {
    const stage = process.env.stage || "dev";
    InitService.paramStore = JSON.parse(
      fs.readFileSync(
        path.resolve(__dirname, `../../configs/${stage}.config.json`),
        "utf8"
      )
    );
  }

  public static getInstance(): InitService {
    if (!InitService.instance) {
      InitService.instance = new InitService();
    }
    return InitService.instance;
  }

  // function to get from secret manager to load in configs
  getParams(key: string): string {
    return InitService.paramStore[key];
  }
}
