import { assert } from "chai";
import { StatusCodeRangeClient } from "./generated/response/status-code-range/src/index.js";
import { RestError } from "@azure/core-rest-pipeline";

describe("Response Status Code Range Client", () => {
  let client: StatusCodeRangeClient;

  beforeEach(() => {
    client = new StatusCodeRangeClient({
      endpoint: "http://localhost:3002",
      allowInsecureConnection: true,
      retryOptions: {
        maxRetries: 0
      }
    });
  });

  it("should handle 404 error response", async () => {
    try {
      await client.errorResponseStatusCode404();
      assert.fail("Expected an error to be thrown");
    } catch (err) {
      assert.instanceOf(err, RestError);
      assert.strictEqual((err as RestError).statusCode, 404);
    }
  });

  it("should handle error response in range", async () => {
    try {
      await client.errorResponseStatusCodeInRange();
      assert.fail("Expected an error to be thrown");
    } catch (err) {
      assert.instanceOf(err, RestError);
      const statusCode = (err as RestError).statusCode;
      assert.isTrue(
        statusCode !== undefined && statusCode >= 400 && statusCode < 500,
        `Expected 4xx status code, got ${statusCode}`
      );
    }
  });
});
