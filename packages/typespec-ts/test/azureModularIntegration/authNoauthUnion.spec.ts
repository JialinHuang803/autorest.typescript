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

  it("should succeed with no auth", async () => {
    await client.validNoAuth();
  });

  it("should succeed with token", async () => {
    await client.validToken();
  });
});
