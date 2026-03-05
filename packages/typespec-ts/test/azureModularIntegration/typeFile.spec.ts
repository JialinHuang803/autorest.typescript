import { assert } from "chai";
import { resolvePath } from "@typespec/compiler";
import { FileClient } from "./generated/type/file/src/index.js";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

describe("Type File Client", () => {
  let client: FileClient;

  const root = resolvePath(fileURLToPath(import.meta.url), "../../../temp");
  const pngPath = path.resolve(root, "./assets/image.png");

  beforeEach(() => {
    client = new FileClient({
      endpoint: "http://localhost:3002",
      allowInsecureConnection: true,
      retryOptions: {
        maxRetries: 0
      }
    });
  });

  it("should upload file with specific content type", async () => {
    const fileData = fs.readFileSync(pngPath);
    await client.body.uploadFileSpecificContentType(fileData as any);
  });

  it("should upload file with JSON content type", async () => {
    const jsonContent = Buffer.from(JSON.stringify({ message: "test file content" }));
    await client.body.uploadFileJsonContentType(jsonContent as any);
  });

  it("should download file with JSON content type", async () => {
    const result = await client.body.downloadFileJsonContentType();
    assert.isDefined(result);
  });

  it("should download file with specific content type", async () => {
    const result = await client.body.downloadFileSpecificContentType();
    assert.isDefined(result);
  });

  it("should upload file with multiple content types", async () => {
    const fileData = fs.readFileSync(pngPath);
    await client.body.uploadFileMultipleContentTypes(fileData as any);
  });

  it("should download file with multiple content types", async () => {
    const result = await client.body.downloadFileMultipleContentTypes();
    assert.isDefined(result);
  });

  it("should upload file with default content type", async () => {
    const fileData = fs.readFileSync(pngPath);
    await client.body.uploadFileDefaultContentType(fileData as any);
  });

  it("should download file with default content type", async () => {
    const result = await client.body.downloadFileDefaultContentType();
    assert.isDefined(result);
  });
});
