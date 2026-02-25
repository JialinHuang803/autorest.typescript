import { assert } from "chai";
import { ArrayClient } from "./generated/encode/array/src/index.js";

describe("EncodeArrayClient Modular Client", () => {
  let client: ArrayClient;
  const colors = ["blue", "red", "green"];

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
    it("should post comma-delimited array property", async () => {
      const result = await client.property.commaDelimited({ value: colors });
      assert.deepEqual(result.value, colors);
    });

    it("should post space-delimited array property", async () => {
      const result = await client.property.spaceDelimited({ value: colors });
      assert.deepEqual(result.value, colors);
    });

    it("should post pipe-delimited array property", async () => {
      const result = await client.property.pipeDelimited({ value: colors });
      assert.deepEqual(result.value, colors);
    });

    it("should post newline-delimited array property", async () => {
      const result = await client.property.newlineDelimited({ value: colors });
      assert.deepEqual(result.value, colors);
    });

    it("should post enum comma-delimited array property", async () => {
      const result = await client.property.enumCommaDelimited({ value: ["blue", "red", "green"] });
      assert.deepEqual(result.value, ["blue", "red", "green"]);
    });

    it("should post enum space-delimited array property", async () => {
      const result = await client.property.enumSpaceDelimited({ value: ["blue", "red", "green"] });
      assert.deepEqual(result.value, ["blue", "red", "green"]);
    });

    it("should post enum pipe-delimited array property", async () => {
      const result = await client.property.enumPipeDelimited({ value: ["blue", "red", "green"] });
      assert.deepEqual(result.value, ["blue", "red", "green"]);
    });

    it("should post enum newline-delimited array property", async () => {
      const result = await client.property.enumNewlineDelimited({
        value: ["blue", "red", "green"]
      });
      assert.deepEqual(result.value, ["blue", "red", "green"]);
    });

    it("should post extensible-enum comma-delimited array property", async () => {
      const result = await client.property.extensibleEnumCommaDelimited({
        value: ["blue", "red", "green"]
      });
      assert.deepEqual(result.value, ["blue", "red", "green"]);
    });

    it("should post extensible-enum space-delimited array property", async () => {
      const result = await client.property.extensibleEnumSpaceDelimited({
        value: ["blue", "red", "green"]
      });
      assert.deepEqual(result.value, ["blue", "red", "green"]);
    });

    it("should post extensible-enum pipe-delimited array property", async () => {
      const result = await client.property.extensibleEnumPipeDelimited({
        value: ["blue", "red", "green"]
      });
      assert.deepEqual(result.value, ["blue", "red", "green"]);
    });

    it("should post extensible-enum newline-delimited array property", async () => {
      const result = await client.property.extensibleEnumNewlineDelimited({
        value: ["blue", "red", "green"]
      });
      assert.deepEqual(result.value, ["blue", "red", "green"]);
    });
  });
});
