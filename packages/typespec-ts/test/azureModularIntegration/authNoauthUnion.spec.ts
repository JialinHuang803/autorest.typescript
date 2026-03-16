import { UnionClient } from "./generated/authentication/noauth/union/src/index.js";
import { PipelinePolicy } from "@azure/core-rest-pipeline";

describe("Authentication Noauth Union", () => {
  let client: UnionClient;

  beforeEach(() => {
    client = new UnionClient({
      endpoint: "http://localhost:3002",
      allowInsecureConnection: true,
      retryOptions: {
        maxRetries: 0
      }
    });
  });

  it("should call validNoAuth without credentials", async () => {
    await client.validNoAuth();
  });

  it("should call validToken with bearer token", async () => {
    const bearerTokenPolicy: PipelinePolicy = {
      name: "bearerTokenPolicy",
      sendRequest: async (request, next) => {
        request.headers.set(
          "Authorization",
          "Bearer https://security.microsoft.com/.default"
        );
        return next(request);
      }
    };
    client.pipeline.addPolicy(bearerTokenPolicy);
    await client.validToken();
  });
});
