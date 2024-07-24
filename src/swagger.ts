import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Title",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
    },
  },
  apis: [path.resolve(__dirname, "routes/*.ts")], // Path to your API route files
};

export const swaggerSpec = swaggerJsdoc(options);
