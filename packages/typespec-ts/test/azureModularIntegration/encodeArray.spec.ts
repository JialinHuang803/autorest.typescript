import { assert } from "chai";
import {
  ArrayClient,
  Colors,
  ColorsExtensibleEnum,
} from "./generated/encode/array/src/index.js";

describe("EncodeArray", () => {
  let client: ArrayClient;

  beforeEach(() => {
    client = new ArrayClient({
      endpoint: "http://localhost:3002",
      allowInsecureConnection: true,
      retryOptions: {
        maxRetries: 0,
      },
    });
  });

  const colors = ["blue", "red", "green"];
  const colorsEnum: Colors[] = ["blue", "red", "green"];
  const colorsExtensibleEnum: ColorsExtensibleEnum[] = [
    "blue",
    "red",
    "green",
  ];

  describe("property", () => {
    it("should handle comma delimited array", async () => {
      const result = await client.property.commaDelimited({
        value: colors,
      });
      assert.deepEqual(result.value, colors);
    });

    it("should handle space delimited array", async () => {
      const result = await client.property.spaceDelimited({
        value: colors,
      });
      assert.deepEqual(result.value, colors);
    });

    it("should handle pipe delimited array", async () => {
      const result = await client.property.pipeDelimited({
        value: colors,
      });
      assert.deepEqual(result.value, colors);
    });

    it("should handle newline delimited array", async () => {
      const result = await client.property.newlineDelimited({
        value: colors,
      });
      assert.deepEqual(result.value, colors);
    });

    it("should handle enum comma delimited array", async () => {
      const result = await client.property.enumCommaDelimited({
        value: colorsEnum,
      });
      assert.deepEqual(result.value, colorsEnum);
    });

    it("should handle enum space delimited array", async () => {
      const result = await client.property.enumSpaceDelimited({
        value: colorsEnum,
      });
      assert.deepEqual(result.value, colorsEnum);
    });

    it("should handle enum pipe delimited array", async () => {
      const result = await client.property.enumPipeDelimited({
        value: colorsEnum,
      });
      assert.deepEqual(result.value, colorsEnum);
    });

    it("should handle enum newline delimited array", async () => {
      const result = await client.property.enumNewlineDelimited({
        value: colorsEnum,
      });
      assert.deepEqual(result.value, colorsEnum);
    });

    it("should handle extensible enum comma delimited array", async () => {
      const result = await client.property.extensibleEnumCommaDelimited({
        value: colorsExtensibleEnum,
      });
      assert.deepEqual(result.value, colorsExtensibleEnum);
    });

    it("should handle extensible enum space delimited array", async () => {
      const result = await client.property.extensibleEnumSpaceDelimited({
        value: colorsExtensibleEnum,
      });
      assert.deepEqual(result.value, colorsExtensibleEnum);
    });

    it("should handle extensible enum pipe delimited array", async () => {
      const result = await client.property.extensibleEnumPipeDelimited({
        value: colorsExtensibleEnum,
      });
      assert.deepEqual(result.value, colorsExtensibleEnum);
    });

    it("should handle extensible enum newline delimited array", async () => {
      const result = await client.property.extensibleEnumNewlineDelimited({
        value: colorsExtensibleEnum,
      });
      assert.deepEqual(result.value, colorsExtensibleEnum);
    });
  });
});
