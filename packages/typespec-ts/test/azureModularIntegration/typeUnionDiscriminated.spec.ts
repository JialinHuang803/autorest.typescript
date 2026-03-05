import { assert } from "chai";
import {
  DiscriminatedClient,
  Cat,
  PetWithEnvelope,
  PetWithCustomNames,
  PetInline,
  PetInlineWithCustomDiscriminator
} from "./generated/type/union/discriminated/src/index.js";

describe("Type Union Discriminated Client", () => {
  let client: DiscriminatedClient;

  const catData: Cat = {
    name: "Whiskers",
    meow: true
  };

  // These envelope/discriminator types are not correctly typed in the generated code
  // The wire format includes envelope wrapper/discriminator properties that are not
  // part of the TypeScript type (emitter limitation)
  const envelopeCatBody = {
    kind: "cat",
    value: catData
  } as unknown as PetWithEnvelope;

  const customNamesCatBody = {
    petType: "cat",
    petData: catData
  } as unknown as PetWithCustomNames;

  const inlineCatBody = {
    kind: "cat",
    name: "Whiskers",
    meow: true
  } as unknown as PetInline;

  const inlineCustomCatBody = {
    type: "cat",
    name: "Whiskers",
    meow: true
  } as unknown as PetInlineWithCustomDiscriminator;

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
      const result = await client.envelope.object.default.put(envelopeCatBody);
      assert.isDefined(result);
    });
  });

  describe("Envelope Object CustomProperties", () => {
    it("should get envelope object custom properties", async () => {
      const result = await client.envelope.object.customProperties.get();
      assert.isDefined(result);
    });

    it("should put envelope object custom properties", async () => {
      const result = await client.envelope.object.customProperties.put(customNamesCatBody);
      assert.isDefined(result);
    });
  });

  describe("NoEnvelope Default", () => {
    it("should get no-envelope default", async () => {
      const result = await client.noEnvelope.default.get();
      assert.isDefined(result);
    });

    it("should put no-envelope default", async () => {
      const result = await client.noEnvelope.default.put(inlineCatBody);
      assert.isDefined(result);
    });
  });

  describe("NoEnvelope CustomDiscriminator", () => {
    it("should get no-envelope custom discriminator", async () => {
      const result = await client.noEnvelope.customDiscriminator.get();
      assert.isDefined(result);
    });

    it("should put no-envelope custom discriminator", async () => {
      const result = await client.noEnvelope.customDiscriminator.put(inlineCustomCatBody);
      assert.isDefined(result);
    });
  });
});
