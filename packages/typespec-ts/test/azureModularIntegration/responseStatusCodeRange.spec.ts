import { assert } from "chai";
import { StatusCodeRangeClient } from "./generated/response/status-code-range/src/index.js";

describe("Response StatusCodeRange Client", () => {
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

  it("should handle error response status code in range (494)", async () => {
    try {
      await client.errorResponseStatusCodeInRange();
      assert.fail("Expected an error to be thrown");
    } catch (error: any) {
      assert.strictEqual(error.statusCode, 494);
    }
  });

  it("should handle error response status code 404", async () => {
    try {
      await client.errorResponseStatusCode404();
      assert.fail("Expected an error to be thrown");
    } catch (error: any) {
      assert.strictEqual(error.statusCode, 404);
    }
  });
});
