import { assert } from "chai";
import { UnionClient } from "./generated/authentication/noauth/union/src/index.js";

describe("Authentication Noauth Union Client", () => {
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

  it("should allow valid no-auth request", async () => {
    await client.validNoAuth();
  });

  it("should allow valid token request", async () => {
    await client.validToken({
      requestOptions: {
        headers: {
          authorization: "Bearer https://security.microsoft.com/.default"
        }
      }
    });
  });
});
