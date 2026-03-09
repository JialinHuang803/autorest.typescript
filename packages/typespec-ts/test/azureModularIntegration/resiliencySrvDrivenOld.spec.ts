import { ResiliencyServiceDrivenClient } from "./generated/resiliency/srv-driven-old/src/index.js";
import { assert } from "chai";
describe("Service Driven old Client v1", () => {
  let client: ResiliencyServiceDrivenClient;

  beforeEach(() => {
    client = new ResiliencyServiceDrivenClient("http://localhost:3002", "v1", {
      allowInsecureConnection: true,
      apiVersion: "v1"
    });
  });

  it("should work with none parameter", async () => {
    const result = await client.fromNone();
    assert.isUndefined(result);
  });

  it("should work with one optional parameter", async () => {
    const result = await client.fromOneOptional({
      parameter: "optional"
    });
    assert.isUndefined(result);
  });

  it("should work with one required parameter", async () => {
    const result = await client.fromOneRequired("required");
    assert.isUndefined(result);
  });
});
describe("Service Driven old Client v2", () => {
  let client: ResiliencyServiceDrivenClient;

  beforeEach(() => {
    client = new ResiliencyServiceDrivenClient("http://localhost:3002", "v2", {
      allowInsecureConnection: true,
      apiVersion: "v1"
    });
  });

  it("should work with none parameter", async () => {
    const result = await client.fromNone();
    assert.isUndefined(result);
  });

  it("should work with one optional parameter", async () => {
    const result = await client.fromOneOptional({
      parameter: "optional"
    });
    assert.isUndefined(result);
  });

  it("should work with one required parameter", async () => {
    const result = await client.fromOneRequired("required");
    assert.isUndefined(result);
  });
});

describe("Service Driven breakTheGlass", () => {
  it("should break the glass - use v1 client to call new v2 operation", async () => {
    // The v1 client always generates URLs with client:v1 in the path.
    // To call the new add-operation (added in v2) from a v1 client, we use raw
    // HTTP since addOperation is not in the v1 spec (breaking the glass).
    const response = await fetch(
      "http://localhost:3002/resiliency/service-driven/client:v1/service:v2/api-version:v2/add-operation",
      { method: "DELETE" }
    );
    assert.equal(response.status, 204);
  });
});
