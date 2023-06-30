import "dotenv/config";
import "reflect-metadata";

import { App } from "./app";

console.clear();

export async function bootstrap() {
  new App().setup();
}

bootstrap();
