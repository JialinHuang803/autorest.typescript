import { assert } from "chai";
import { DiscriminatedClient } from "./generated/type/union/discriminated/src/index.js";

describe("Type Union Discriminated Client", () => {
  let client: DiscriminatedClient;

  const catData = {
    name: "Whiskers",
    meow: true
  };

  const envelopeCatBody = {
    kind: "cat",
    value: catData
  };

  const customNamesCatBody = {
    petType: "cat",
    petData: catData
  };

  const inlineCatBody = {
    kind: "cat",
    name: "Whiskers",
    meow: true
  };

  const inlineCustomCatBody = {
    type: "cat",
    name: "Whiskers",
    meow: true
  };

  beforeEach(() => {
    client = new DiscriminatedClient({
      endpoint: "http://localhost:3002",
      allowInsecureConnection: true,
      retryOptions: {
        maxRetries: 0
      }
    });
  });

  describe("Envelope Object Default", () => {
    it("should get envelope object default", async () => {
      const result = await client.envelope.object.default.get();
      assert.isDefined(result);
    });

    it("should put envelope object default", async () => {
      const result = await client.envelope.object.default.put(envelopeCatBody as any);
      assert.isDefined(result);
    });
  });

  describe("Envelope Object CustomProperties", () => {
    it("should get envelope object custom properties", async () => {
      const result = await client.envelope.object.customProperties.get();
      assert.isDefined(result);
    });

    it("should put envelope object custom properties", async () => {
      const result = await client.envelope.object.customProperties.put(
        customNamesCatBody as any
      );
      assert.isDefined(result);
    });
  });

  describe("NoEnvelope Default", () => {
    it("should get no-envelope default", async () => {
      const result = await client.noEnvelope.default.get();
      assert.isDefined(result);
    });

    it("should put no-envelope default", async () => {
      const result = await client.noEnvelope.default.put(inlineCatBody as any);
      assert.isDefined(result);
    });
  });

  describe("NoEnvelope CustomDiscriminator", () => {
    it("should get no-envelope custom discriminator", async () => {
      const result = await client.noEnvelope.customDiscriminator.get();
      assert.isDefined(result);
    });

    it("should put no-envelope custom discriminator", async () => {
      const result = await client.noEnvelope.customDiscriminator.put(inlineCustomCatBody as any);
      assert.isDefined(result);
    });
  });
});
