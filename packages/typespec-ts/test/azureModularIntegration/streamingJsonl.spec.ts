import { assert } from "chai";
import { JsonlClient } from "./generated/streaming/jsonl/src/index.js";

describe("Streaming JSONL Client", () => {
  let client: JsonlClient;

  beforeEach(() => {
    client = new JsonlClient({
      endpoint: "http://localhost:3002",
      allowInsecureConnection: true,
      retryOptions: {
        maxRetries: 0
      }
    });
  });

  it("should send JSONL data", async () => {
    const data = Buffer.from('{"desc": "one"}\n{"desc": "two"}\n{"desc": "three"}');
    await client.basic.send(data);
  });

  it("should receive JSONL data", async () => {
    const result = await client.basic.receive();
    assert.isDefined(result);
    assert.isTrue(result.length > 0);
  });
});
