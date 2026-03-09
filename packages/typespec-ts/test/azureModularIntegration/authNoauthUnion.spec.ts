import { assert } from "chai";
import { UnionClient } from "./generated/authentication/noauth/union/src/index.js";

describe("Authentication Noauth Union", () => {
  it("should call validNoAuth without authentication", async () => {
    const client = new UnionClient({
      endpoint: "http://localhost:3002",
      allowInsecureConnection: true,
      retryOptions: {
        maxRetries: 0
      }
    });
    const result = await client.validNoAuth();
    assert.isUndefined(result);
  });

  it("should call validToken with bearer token authentication", async () => {
    const client = new UnionClient({
      endpoint: "http://localhost:3002",
      allowInsecureConnection: true,
      retryOptions: {
        maxRetries: 0
      }
    });
    // Add bearer token via custom headers
    const result = await client.validToken({
      requestOptions: {
        headers: {
          authorization: "Bearer https://security.microsoft.com/.default"
        }
      }
    });
    assert.isUndefined(result);
  });
});
