import { assert } from "chai";
import { ClientDefaultValueClient } from "./generated/azure/client-generator-core/client-default-value/src/index.js";

describe("Azure Client Generator Core ClientDefaultValue Client", () => {
  let client: ClientDefaultValueClient;

  beforeEach(() => {
    client = new ClientDefaultValueClient({
      endpoint: "http://localhost:3002",
      allowInsecureConnection: true,
      retryOptions: {
        maxRetries: 0
      }
    });
  });

  it("should put model property with default values", async () => {
    const result = await client.putModelProperty({ name: "test" });
    assert.strictEqual(result.name, "test");
    assert.strictEqual(result.timeout, 30);
    assert.strictEqual(result.tier, "standard");
    assert.strictEqual(result.retry, true);
  });

  it("should get with operation parameter defaults", async () => {
    await client.getOperationParameter("test");
  });

  it("should get with path parameter defaults", async () => {
    await client.getPathParameter("default-segment1", "segment2");
  });

  it("should get with header parameter defaults", async () => {
    await client.getHeaderParameter();
  });
});
