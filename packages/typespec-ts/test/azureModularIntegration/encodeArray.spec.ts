import { assert } from "chai";
import { ArrayClient } from "./generated/encode/array/src/index.js";

describe("Encode Array Client", () => {
  let client: ArrayClient;

  beforeEach(() => {
    client = new ArrayClient({
      endpoint: "http://localhost:3002",
      allowInsecureConnection: true,
      retryOptions: {
        maxRetries: 0
      }
    });
  });

  it("should post property commaDelimited", async () => {
    const result = await client.property.commaDelimited({
      value: ["blue", "red", "green"]
    });
    assert.deepEqual(result.value, ["blue", "red", "green"]);
  });

  it("should post property spaceDelimited", async () => {
    const result = await client.property.spaceDelimited({
      value: ["blue", "red", "green"]
    });
    assert.deepEqual(result.value, ["blue", "red", "green"]);
  });

  it("should post property pipeDelimited", async () => {
    const result = await client.property.pipeDelimited({
      value: ["blue", "red", "green"]
    });
    assert.deepEqual(result.value, ["blue", "red", "green"]);
  });

  it("should post property newlineDelimited", async () => {
    const result = await client.property.newlineDelimited({
      value: ["blue", "red", "green"]
    });
    assert.deepEqual(result.value, ["blue", "red", "green"]);
  });

  it("should post property enumCommaDelimited", async () => {
    const result = await client.property.enumCommaDelimited({
      value: ["blue", "red", "green"]
    });
    assert.deepEqual(result.value, ["blue", "red", "green"]);
  });

  it("should post property enumSpaceDelimited", async () => {
    const result = await client.property.enumSpaceDelimited({
      value: ["blue", "red", "green"]
    });
    assert.deepEqual(result.value, ["blue", "red", "green"]);
  });

  it("should post property enumPipeDelimited", async () => {
    const result = await client.property.enumPipeDelimited({
      value: ["blue", "red", "green"]
    });
    assert.deepEqual(result.value, ["blue", "red", "green"]);
  });

  it("should post property enumNewlineDelimited", async () => {
    const result = await client.property.enumNewlineDelimited({
      value: ["blue", "red", "green"]
    });
    assert.deepEqual(result.value, ["blue", "red", "green"]);
  });

  it("should post property extensibleEnumCommaDelimited", async () => {
    const result = await client.property.extensibleEnumCommaDelimited({
      value: ["blue", "red", "green"]
    });
    assert.deepEqual(result.value, ["blue", "red", "green"]);
  });

  it("should post property extensibleEnumSpaceDelimited", async () => {
    const result = await client.property.extensibleEnumSpaceDelimited({
      value: ["blue", "red", "green"]
    });
    assert.deepEqual(result.value, ["blue", "red", "green"]);
  });

  it("should post property extensibleEnumPipeDelimited", async () => {
    const result = await client.property.extensibleEnumPipeDelimited({
      value: ["blue", "red", "green"]
    });
    assert.deepEqual(result.value, ["blue", "red", "green"]);
  });

  it("should post property extensibleEnumNewlineDelimited", async () => {
    const result = await client.property.extensibleEnumNewlineDelimited({
      value: ["blue", "red", "green"]
    });
    assert.deepEqual(result.value, ["blue", "red", "green"]);
  });
});
