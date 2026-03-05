import { assert } from "chai";
import { Combined } from "./generated/azure/resource-manager/multi-service-shared-models/src/index.js";

describe("Azure ARM MultiService SharedModels Client", () => {
  const SUBSCRIPTION_ID = "00000000-0000-0000-0000-000000000000";
  const RESOURCE_GROUP = "test-rg";

  let client: Combined;

  beforeEach(() => {
    client = new Combined(SUBSCRIPTION_ID, {
      endpoint: "http://localhost:3002",
      allowInsecureConnection: true,
      retryOptions: {
        maxRetries: 0
      }
    });
  });

  describe("VirtualMachines (shared models)", () => {
    it("should get a virtual machine (shared models)", async () => {
      const result = await client.virtualMachines.get(
        RESOURCE_GROUP,
        "vm-shared1"
      );
      assert.strictEqual(result.name, "vm-shared1");
      assert.strictEqual(result.location, "eastus");
      assert.strictEqual(result.properties?.provisioningState, "Succeeded");
    });

    it("should create or update a virtual machine (shared models)", async () => {
      const result = await client.virtualMachines.createOrUpdate(
        RESOURCE_GROUP,
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

  describe("StorageAccounts (shared models)", () => {
    it("should get a storage account (shared models)", async () => {
      const result = await client.storageAccounts.get(
        RESOURCE_GROUP,
        "account1"
      );
      assert.strictEqual(result.name, "account1");
      assert.strictEqual(result.location, "westus");
      assert.strictEqual(result.properties?.provisioningState, "Succeeded");
    });

    it("should create or update a storage account (shared models)", async () => {
      const result = await client.storageAccounts.createOrUpdate(
        RESOURCE_GROUP,
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
