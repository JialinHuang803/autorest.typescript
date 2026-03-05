import { assert } from "chai";
import { JsonlClient } from "./generated/streaming/jsonl/src/index.js";

describe("Streaming Jsonl Client", () => {
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

  it("should receive jsonl stream", async () => {
    const result = await client.basic.receive();
    assert.isDefined(result);
    // The result is a Uint8Array containing the JSONL content
    const content = new TextDecoder().decode(result);
    assert.include(content, '{"desc": "one"}');
    assert.include(content, '{"desc": "two"}');
    assert.include(content, '{"desc": "three"}');
  });

  // skip: send with JSONL stream is not supported by the emitter
  // The emitter generates __PLACEHOLDER_o51__ type for the stream parameter
  it.skip("should send jsonl stream", async () => {
    const content = '{"desc": "one"}\n{"desc": "two"}\n{"desc": "three"}';
    const stream = new TextEncoder().encode(content) as any;
    await client.basic.send(stream);
  });
});
