import { assert } from "chai";
import {
  ArrayClient,
  Colors,
  ColorsExtensibleEnum
} from "./generated/encode/array/src/index.js";

describe("EncodeArray", () => {
  let client: ArrayClient;

  const colors: string[] = ["blue", "red", "green"];
  const enumColors: Colors[] = ["blue", "red", "green"];
  const extensibleEnumColors: ColorsExtensibleEnum[] = ["blue", "red", "green"];

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
    it("should handle comma delimited array property", async () => {
      const result = await client.property.commaDelimited({
        value: colors
      });
      assert.deepEqual(result.value, colors);
    });

    it("should handle space delimited array property", async () => {
      const result = await client.property.spaceDelimited({
        value: colors
      });
      assert.deepEqual(result.value, colors);
    });

    it("should handle pipe delimited array property", async () => {
      const result = await client.property.pipeDelimited({
        value: colors
      });
      assert.deepEqual(result.value, colors);
    });

    it("should handle newline delimited array property", async () => {
      const result = await client.property.newlineDelimited({
        value: colors
      });
      assert.deepEqual(result.value, colors);
    });

    it("should handle enum comma delimited array property", async () => {
      const result = await client.property.enumCommaDelimited({
        value: enumColors
      });
      assert.deepEqual(result.value, enumColors);
    });

    it("should handle enum space delimited array property", async () => {
      const result = await client.property.enumSpaceDelimited({
        value: enumColors
      });
      assert.deepEqual(result.value, enumColors);
    });

    it("should handle enum pipe delimited array property", async () => {
      const result = await client.property.enumPipeDelimited({
        value: enumColors
      });
      assert.deepEqual(result.value, enumColors);
    });

    it("should handle enum newline delimited array property", async () => {
      const result = await client.property.enumNewlineDelimited({
        value: enumColors
      });
      assert.deepEqual(result.value, enumColors);
    });

    it("should handle extensible enum comma delimited array property", async () => {
      const result = await client.property.extensibleEnumCommaDelimited({
        value: extensibleEnumColors
      });
      assert.deepEqual(result.value, extensibleEnumColors);
    });

    it("should handle extensible enum space delimited array property", async () => {
      const result = await client.property.extensibleEnumSpaceDelimited({
        value: extensibleEnumColors
      });
      assert.deepEqual(result.value, extensibleEnumColors);
    });

    it("should handle extensible enum pipe delimited array property", async () => {
      const result = await client.property.extensibleEnumPipeDelimited({
        value: extensibleEnumColors
      });
      assert.deepEqual(result.value, extensibleEnumColors);
    });

    it("should handle extensible enum newline delimited array property", async () => {
      const result = await client.property.extensibleEnumNewlineDelimited({
        value: extensibleEnumColors
      });
      assert.deepEqual(result.value, extensibleEnumColors);
    });
  });
});
