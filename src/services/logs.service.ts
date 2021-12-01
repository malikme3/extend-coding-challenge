import { LogLevel } from "../enums/common.enums";

/**
 * This is equivalent to:
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevel;

function printImportant(key: LogLevelStrings, message: string) {
  const num = LogLevel[key];
  if (num <= LogLevel.warn) {
    console.log("Log level message is:", message);
  }
}
printImportant("error", "This is a message");
