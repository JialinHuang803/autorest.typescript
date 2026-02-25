import { assert } from "chai";
import { ArrayClient } from "./generated/encode/array/src/index.js";

describe("EncodeArrayClient", () => {
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

  describe("property", () => {
    it("should handle comma-delimited string array", async () => {
      const result = await client.property.commaDelimited({
        value: ["blue", "red", "green"]
      });
      assert.deepEqual(result.value, ["blue", "red", "green"]);
    });

    it("should handle space-delimited string array", async () => {
      const result = await client.property.spaceDelimited({
        value: ["blue", "red", "green"]
      });
      assert.deepEqual(result.value, ["blue", "red", "green"]);
    });

    it("should handle pipe-delimited string array", async () => {
      const result = await client.property.pipeDelimited({
        value: ["blue", "red", "green"]
      });
      assert.deepEqual(result.value, ["blue", "red", "green"]);
    });

    it("should handle newline-delimited string array", async () => {
      const result = await client.property.newlineDelimited({
        value: ["blue", "red", "green"]
      });
      assert.deepEqual(result.value, ["blue", "red", "green"]);
    });

    it("should handle comma-delimited enum array", async () => {
      const result = await client.property.enumCommaDelimited({
        value: ["blue", "red", "green"]
      });
      assert.deepEqual(result.value, ["blue", "red", "green"]);
    });

    it("should handle space-delimited enum array", async () => {
      const result = await client.property.enumSpaceDelimited({
        value: ["blue", "red", "green"]
      });
      assert.deepEqual(result.value, ["blue", "red", "green"]);
    });

    it("should handle pipe-delimited enum array", async () => {
      const result = await client.property.enumPipeDelimited({
        value: ["blue", "red", "green"]
      });
      assert.deepEqual(result.value, ["blue", "red", "green"]);
    });

    it("should handle newline-delimited enum array", async () => {
      const result = await client.property.enumNewlineDelimited({
        value: ["blue", "red", "green"]
      });
      assert.deepEqual(result.value, ["blue", "red", "green"]);
    });

    it("should handle comma-delimited extensible enum array", async () => {
      const result = await client.property.extensibleEnumCommaDelimited({
        value: ["blue", "red", "green"]
      });
      assert.deepEqual(result.value, ["blue", "red", "green"]);
    });

    it("should handle space-delimited extensible enum array", async () => {
      const result = await client.property.extensibleEnumSpaceDelimited({
        value: ["blue", "red", "green"]
      });
      assert.deepEqual(result.value, ["blue", "red", "green"]);
    });

    it("should handle pipe-delimited extensible enum array", async () => {
      const result = await client.property.extensibleEnumPipeDelimited({
        value: ["blue", "red", "green"]
      });
      assert.deepEqual(result.value, ["blue", "red", "green"]);
    });

    it("should handle newline-delimited extensible enum array", async () => {
      const result = await client.property.extensibleEnumNewlineDelimited({
        value: ["blue", "red", "green"]
      });
      assert.deepEqual(result.value, ["blue", "red", "green"]);
    });
  });
});
