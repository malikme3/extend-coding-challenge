import {  LogLevel } from "../enums/common.enums";
import { InitService } from "./init.service";

// for custom logging
type LogLevelStrings = keyof typeof LogLevel;
export class LogsService {
  /**
   * type LogLevelStrings = 'error' | 'warn' | 'info' | 'debug';
   */
  static log(key: LogLevelStrings, message: string) {
    // loggingLevel =>  error = 0, warn = 1, info = 2, debug = 3
    const loggingLevel = InitService.getInstance().getParams("LOG_LEVEL");
    if (LogLevel[key] <= parseInt(loggingLevel)) {
      console[key](message);
    }
  }
}
