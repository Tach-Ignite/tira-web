/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LoggerInterface {
  error(message: string, ...metadata: any[]): void;
  warn(message: string, ...metadata: any[]): void;
  info(message: string, ...metadata: any[]): void;
  http(message: string, ...metadata: any[]): void;
  verbose(message: string, ...metadata: any[]): void;
  debug(message: string, ...metadata: any[]): void;
  silly(message: string, ...metadata: any[]): void;
}

export interface ILoggerConfig {
  name?: string;
  level?: string;
  cloudwatchEnabled?: boolean;
}
