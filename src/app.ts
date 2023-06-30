import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./di-container";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "../swaggerOptions";

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export class App {
  async setup() {
    const server = new InversifyExpressServer(container);

    server.setConfig((app) => {
      app.use(express.json());
      app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    });

    const app = server.build();

    app.listen(process.env.PORT, () => {
      console.log(`server is running on http://localhost:${process.env.PORT}`);
    });
  }
}
