import { assert } from "chai";
import { Combined } from "./generated/azure/resource-manager/multi-service-shared-models/src/index.js";

describe("Azure ResourceManager MultiService SharedModels", () => {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroup = "test-rg";
  let client: Combined;

  beforeEach(() => {
    client = new Combined(subscriptionId, {
      endpoint: "http://localhost:3002",
      allowInsecureConnection: true,
      retryOptions: {
        maxRetries: 0
      }
    });
  });

  describe("Compute VirtualMachines", () => {
    it("should get virtual machine", async () => {
      const result = await client.virtualMachines.get(
        resourceGroup,
        "vm-shared1"
      );
      assert.strictEqual(result.name, "vm-shared1");
      assert.strictEqual(result.location, "eastus");
      assert.strictEqual(result.properties?.provisioningState, "Succeeded");
    });

    it("should create or update virtual machine", async () => {
      const result = await client.virtualMachines.createOrUpdate(
        resourceGroup,
        "vm-shared1",
        {
          location: "eastus",
          properties: {
            metadata: {
              createdBy: "user@example.com",
              tags: {
                environment: "production"
              }
            }
          }
        }
      );
      assert.strictEqual(result.name, "vm-shared1");
      assert.strictEqual(result.location, "eastus");
      assert.strictEqual(result.properties?.provisioningState, "Succeeded");
    });
  });

  describe("Storage StorageAccounts", () => {
    it("should get storage account", async () => {
      const result = await client.storageAccounts.get(
        resourceGroup,
        "account1"
      );
      assert.strictEqual(result.name, "account1");
      assert.strictEqual(result.location, "westus");
      assert.strictEqual(result.properties?.provisioningState, "Succeeded");
    });

    it("should create or update storage account", async () => {
      const result = await client.storageAccounts.createOrUpdate(
        resourceGroup,
        "account1",
        {
          location: "westus",
          properties: {
            metadata: {
              createdBy: "admin@example.com",
              tags: {
                department: "engineering"
              }
            }
          }
        }
      );
      assert.strictEqual(result.name, "account1");
      assert.strictEqual(result.location, "westus");
      assert.strictEqual(result.properties?.provisioningState, "Succeeded");
    });
  });
});
