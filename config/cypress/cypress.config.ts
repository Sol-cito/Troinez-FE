import { defineConfig } from "cypress";

const SERVER_HOST: string = process.env.SERVER_HOST || "localhost";
const SERVER_PORT: string = process.env.SERVER_PORT || "3000";

export default defineConfig({
  e2e: {
    baseUrl: `http://${SERVER_HOST}:${SERVER_PORT}`,
    retries: 1,
    defaultCommandTimeout: 10 * 1000,
    specPattern: "**/*.spec.*",
    supportFile: "e2e/cypress.support.ts",
    video: false,
  },
});
