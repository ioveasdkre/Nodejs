declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    DATABASE?: string;
    DATABASE_PASSWORD?: string;
    // 其他環境變數的定義...
  }
}
