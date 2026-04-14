import { assert } from "chai";
import { JsonMergePatchClient, Resource, ResourcePatch } from "./generated/payload/json-merge-patch/src/index.js";

describe("Payload JSON Merge Patch Client", () => {
  let client: JsonMergePatchClient;

  const expectedCreateBody: Resource = {
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

  // JSON Merge Patch uses null values to delete fields - type cast needed since
  // TypeScript types don't include null for optional fields
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
    const result = await client.createResource(expectedCreateBody);
    assert.strictEqual(result.name, expectedCreateBody.name);
    assert.strictEqual(result.description, expectedCreateBody.description);
  });

  it("should update resource", async () => {
    // Use type cast because null values are valid for JSON Merge Patch but not in TypeScript optional types
    const result = await client.updateResource(expectedUpdateBody as unknown as ResourcePatch);
    assert.strictEqual(result.name, "Madge");
    assert.isUndefined(result.description);
  });

  it("should update optional resource", async () => {
    // Use type cast because null values are valid for JSON Merge Patch but not in TypeScript optional types
    const result = await client.updateOptionalResource({
      body: expectedUpdateBody as unknown as ResourcePatch
    });
    assert.strictEqual(result.name, "Madge");
    assert.isUndefined(result.description);
  });
});
