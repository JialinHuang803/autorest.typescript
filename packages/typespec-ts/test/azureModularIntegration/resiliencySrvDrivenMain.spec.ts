import { ResiliencyServiceDrivenClient } from "./generated/resiliency/srv-driven-main/src/index.js";
import { ResiliencyServiceDrivenClient as ResiliencyServiceDrivenOldClient } from "./generated/resiliency/srv-driven-old/src/index.js";
import { createDefaultHttpClient, createPipelineRequest } from "@azure/core-rest-pipeline";
import { assert } from "chai";
describe("Service Driven new Client v1", () => {
  let client: ResiliencyServiceDrivenClient;

  beforeEach(() => {
    client = new ResiliencyServiceDrivenClient("http://localhost:3002", "v2", {
      allowInsecureConnection: true,
      apiVersion: "v1"
    });
  });

  it("should work with none parameter", async () => {
    const result = await client.fromNone({
      newParameter: "new"
    });
    assert.isUndefined(result);
  });

  it("should work with one optional parameter", async () => {
    const result = await client.fromOneOptional({
      parameter: "optional",
      newParameter: "new"
    });
    assert.isUndefined(result);
  });

  it("should work with one required parameter", async () => {
    const result = await client.fromOneRequired("required", {
      newParameter: "new"
    });
    assert.isUndefined(result);
  });
});
describe("Service Driven new Client v2", () => {
  let client: ResiliencyServiceDrivenClient;

  beforeEach(() => {
    client = new ResiliencyServiceDrivenClient("http://localhost:3002", "v2", {
      allowInsecureConnection: true,
      apiVersion: "v2"
    });
  });

  it("should work with none parameter", async () => {
    const result = await client.fromNone({
      newParameter: "new"
    });
    assert.isUndefined(result);
  });

  it("should work with one optional parameter", async () => {
    const result = await client.fromOneOptional({
      parameter: "optional",
      newParameter: "new"
    });
    assert.isUndefined(result);
  });

  it("should work with one required parameter", async () => {
    const result = await client.fromOneRequired("required", {
      newParameter: "new"
    });
    assert.isUndefined(result);
  });

  it("should work with add operation", async () => {
    const result = await client.addOperation();
    assert.isUndefined(result);
  });
});

describe("Resiliency ServiceDriven breakTheGlass", () => {
  it("should break the glass using v1 client to call v2-only operation", async () => {
    // The 'break the glass' scenario: use the old v1 client (client:v1 in URL) with v2 service
    // and v2 api-version to call the new add-operation endpoint that was added in v2
    const oldClient = new ResiliencyServiceDrivenOldClient(
      "http://localhost:3002",
      "v2",
      {
        allowInsecureConnection: true,
        apiVersion: "v2"
      }
    );

    const httpClient = createDefaultHttpClient();
    const request = createPipelineRequest({
      url: "http://localhost:3002/resiliency/service-driven/client:v1/service:v2/api-version:v2/add-operation",
      method: "DELETE",
      allowInsecureConnection: true
    });

    const response = await oldClient.pipeline.sendRequest(httpClient, request);
    assert.strictEqual(response.status, 204);
  });
});
