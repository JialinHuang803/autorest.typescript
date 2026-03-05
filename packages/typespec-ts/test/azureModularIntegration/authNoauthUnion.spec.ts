import { UnionClient } from "./generated/authentication/noauth/union/src/index.js";
import {
  bearerTokenAuthenticationPolicyName
} from "@azure/core-rest-pipeline";
import { customBearerTokenAuthenticationPolicy } from "../util/customBearerTokenTestingPolicy.js";

describe("Authentication Noauth Union Client", () => {
  const defaultScope = "https://security.microsoft.com/.default";

  it("should succeed with no auth", async () => {
    const client = new UnionClient({
      endpoint: "http://localhost:3002",
      allowInsecureConnection: true,
      retryOptions: {
        maxRetries: 0
      }
    });
    await client.validNoAuth();
  });

  it("should succeed with token", async () => {
    const client = new UnionClient({
      endpoint: "http://localhost:3002",
      allowInsecureConnection: true,
      retryOptions: {
        maxRetries: 0
      }
    });
    const policy = customBearerTokenAuthenticationPolicy({
      scopes: defaultScope,
      credential: {
        getToken: async () => ({
          token: defaultScope,
          expiresOnTimestamp: Date.now() + 10000
        })
      }
    });
    client.pipeline.removePolicy({ name: bearerTokenAuthenticationPolicyName });
    client.pipeline.addPolicy(policy);
    await client.validToken();
  });
});
