import swaggerAutogen from "swagger-autogen";
/* Swagger configuration */
const options = {
  openapi: "OpenAPI 3", // Enable/Disable OpenAPI. By default is null
  language: "en-US", // Change response language. By default is 'en-US'
  autoBody: true,
};

const doc = {
  info: {
    version: "1.0.0", // by default: '1.0.0'
    title: "Janauber API", // by default: 'REST API'
    description: "API for Managing janauber", // by default: ''
  },
  host: "localhost:3000", // by default: 'localhost:3000'
  basePath: "/", // by default: '/'
  schemes: ["http"], // by default: ['http']
  consumes: ["application/json"], // by default: ['application/json']
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header", // can be 'header', 'query' or 'cookie'
      name: "API-KEY", // name of the header, query parameter or cookie
      description: "API JWT token",
    },
  }, // by default: empty object
};

const outputFile = "./swagger.json";
const endpointsFiles = ["../app.js"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */
swaggerAutogen(options)(outputFile, endpointsFiles, doc).then(async () => {
  await import("../app.js"); // Your project's root file
});
