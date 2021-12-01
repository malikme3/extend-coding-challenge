import { LogLevel } from "../enums/common.enums";

// for custom logging
type LogLevelStrings = keyof typeof LogLevel;
export class LogsService {
  /**
   * type LogLevelStrings = 'error' | 'warn' | 'info' | 'debug';
   */
  static log(key: LogLevelStrings, message: string) {
    const logLevel = LogLevel[key]; // error = 0, warn = 1, info = 2, debug = 3
    if (logLevel <= LogLevel.warn) {
      console[key](message);
    }
  }
}
