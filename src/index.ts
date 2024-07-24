import express from 'express';
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { seedData } from './seeder';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

import movieRoutes from "./routes/movies";

app.use('/api', movieRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

import { createDBConnection } from './config/database';

app.listen(process.env.PORT || 8080, async() => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
  await createDBConnection();

  // await seedData();
});

export { app }

const unexpectedErrorHandler = (error: string) => {
  console.log("error", error);
  process.exit(1);
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);