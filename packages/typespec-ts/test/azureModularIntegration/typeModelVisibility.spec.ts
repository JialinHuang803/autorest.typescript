import { assert } from "chai";
import { VisibilityClient } from "./generated/type/model/visibility/src/index.js";

describe("Type Model Visibility Client", () => {
  let client: VisibilityClient;

  const visibilityModel = {
    readProp: "abc",
    createProp: ["foo", "bar"],
    updateProp: [1, 2],
    deleteProp: true
  };

  beforeEach(() => {
    client = new VisibilityClient({
      endpoint: "http://localhost:3002",
      allowInsecureConnection: true,
      retryOptions: {
        maxRetries: 0
      }
    });
  });

  it("should put read-only model", async () => {
    const result = await client.putReadOnlyModel({
      optionalNullableIntList: [1, 2, 3],
      optionalStringRecord: { k1: "value1", k2: "value2" }
    });
    assert.deepEqual(result.optionalNullableIntList, [1, 2, 3]);
    assert.deepEqual(result.optionalStringRecord, { k1: "value1", k2: "value2" });
  });

  it("should head model", async () => {
    await client.headModel({
      readProp: "abc",
      queryProp: 123,
      createProp: [],
      updateProp: [1, 2],
      deleteProp: false
    });
  });

  it("should get model", async () => {
    const result = await client.getModel({
      readProp: "abc",
      queryProp: 123,
      createProp: [],
      updateProp: [1, 2],
      deleteProp: false
    });
    assert.strictEqual(result.readProp, "abc");
  });

  it("should put model", async () => {
    await client.putModel(visibilityModel);
  });

  it("should patch model", async () => {
    await client.patchModel(visibilityModel);
  });

  it("should post model", async () => {
    await client.postModel(visibilityModel);
  });

  it("should delete model", async () => {
    await client.deleteModel(visibilityModel);
  });
});
