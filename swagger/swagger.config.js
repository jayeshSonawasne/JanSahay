// config/swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "JanSahay API Documentation",
            version: "1.0.0",
            description: "API documentation for JanSeva backend using Swagger",
        },
        servers: [
            {
                url: "https://jansahay.onrender.com",
                description: "Local Server",
            },
        ],
    },

    // Auto-load all route files for swagger comments
    apis: ["./routes/*.js", "./controller/*.js", "./models/*.js", "./swagger/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
