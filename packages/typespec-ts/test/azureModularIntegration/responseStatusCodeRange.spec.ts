import { assert } from "chai";
import { StatusCodeRangeClient } from "./generated/response/status-code-range/src/index.js";

describe("Response StatusCodeRange", () => {
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

  it("should handle error response with status code 404", async () => {
    try {
      await client.errorResponseStatusCode404();
      assert.fail("Expected an error to be thrown");
    } catch (err: any) {
      assert.strictEqual(err.statusCode, 404);
    }
  });

  it("should handle error response with status code in range", async () => {
    try {
      await client.errorResponseStatusCodeInRange();
      assert.fail("Expected an error to be thrown");
    } catch (err: any) {
      assert.strictEqual(err.statusCode, 494);
    }
  });
});
