import { assert } from "chai";
import { JsonMergePatchClient } from "./generated/payload/json-merge-patch/src/index.js";

describe("Payload JSON Merge Patch Client", () => {
  let client: JsonMergePatchClient;

  const expectedCreateBody = {
    name: "Madge",
    description: "desc",
    map: {
      key: {
        name: "InnerMadge",
        description: "innerDesc"
      }
    },
    array: [
      {
        name: "InnerMadge",
        description: "innerDesc"
      }
    ],
    intValue: 1,
    floatValue: 1.25,
    innerModel: {
      name: "InnerMadge",
      description: "innerDesc"
    },
    intArray: [1, 2, 3]
  };

  const expectedUpdateBody = {
    description: null,
    map: {
      key: {
        description: null
      },
      key2: null
    },
    array: null,
    intValue: null,
    floatValue: null,
    innerModel: null,
    intArray: null
  };

  beforeEach(() => {
    client = new JsonMergePatchClient({
      endpoint: "http://localhost:3002",
      allowInsecureConnection: true,
      retryOptions: {
        maxRetries: 0
      }
    });
  });

  it("should create resource", async () => {
    const result = await client.createResource(expectedCreateBody as any);
    assert.strictEqual(result.name, expectedCreateBody.name);
    assert.strictEqual(result.description, expectedCreateBody.description);
  });

  it("should update resource", async () => {
    const result = await client.updateResource(expectedUpdateBody as any);
    assert.strictEqual(result.name, "Madge");
    assert.isUndefined(result.description);
  });

  it("should update optional resource", async () => {
    const result = await client.updateOptionalResource({
      body: expectedUpdateBody as any
    });
    assert.strictEqual(result.name, "Madge");
    assert.isUndefined(result.description);
  });
});
