import { Combined } from "./generated/service/multi-service/src/index.js";

describe("Service MultiService", () => {
  let client: Combined;

  beforeEach(() => {
    client = new Combined({
      endpoint: "http://localhost:3002",
      allowInsecureConnection: true,
      retryOptions: {
        maxRetries: 0
      }
    });
  });

  describe("ServiceA Foo", () => {
    it("should call foo test", async () => {
      await client.foo.test();
    });
  });

  describe("ServiceB Bar", () => {
    it("should call bar test", async () => {
      await client.bar.test();
    });
  });
});
