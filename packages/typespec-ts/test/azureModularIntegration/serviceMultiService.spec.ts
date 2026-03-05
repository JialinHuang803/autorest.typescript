import { Combined } from "./generated/service/multi-service/src/index.js";

describe("Service MultiService Client", () => {
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

  it("should call ServiceA Foo test operation", async () => {
    await client.foo.test();
  });

  it("should call ServiceB Bar test operation", async () => {
    await client.bar.test();
  });
});
