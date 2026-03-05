import { ResiliencyServiceDrivenClient } from "./generated/resiliency/srv-driven-old/src/index.js";
import { assert } from "chai";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
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

describe("Service Driven breakTheGlass scenario", () => {
  let client: ResiliencyServiceDrivenClient;

  beforeEach(() => {
    client = new ResiliencyServiceDrivenClient("http://localhost:3002", "v2", {
      allowInsecureConnection: true,
      apiVersion: "v2"
    });
  });

  it("should support breakTheGlass by calling new operation from old client", async () => {
    // The breakTheGlass scenario tests that an old client can call a new operation
    // by making a raw HTTP request through the pipeline
    const request = createPipelineRequest({
      url: "http://localhost:3002/resiliency/srv-driven/client:v1/service:v2/api-version:v2/add-operation",
      method: "DELETE",
      headers: createHttpHeaders({})
    });
    const response = await client.pipeline.sendRequest(
      {} as any,
      request
    );
    assert.strictEqual(response.status, 204);
  });
});
