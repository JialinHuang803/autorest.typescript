import { assert } from "chai";
import { Combined } from "./generated/azure/resource-manager/multi-service-shared-models/src/index.js";

describe("Azure ARM MultiServiceSharedModels", () => {
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

  describe("Compute VirtualMachines", () => {
    const vmName = "vm-shared1";
    const expectedVm = {
      id: `/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP}/providers/Microsoft.Compute/virtualMachinesShared/${vmName}`,
      name: vmName,
      type: "Microsoft.Compute/virtualMachinesShared",
      location: "eastus",
      properties: {
        provisioningState: "Succeeded",
        metadata: {
          createdAt: new Date("2025-01-01T00:00:00Z"),
          createdBy: "user@example.com",
          tags: { environment: "production" }
        }
      }
    };

    it("should get virtual machine", async () => {
      const result = await client.virtualMachines.get(RESOURCE_GROUP, vmName);
      assert.strictEqual(result.id, expectedVm.id);
      assert.strictEqual(result.name, expectedVm.name);
      assert.strictEqual(result.type, expectedVm.type);
      assert.strictEqual(result.location, expectedVm.location);
      assert.strictEqual(
        result.properties?.provisioningState,
        expectedVm.properties.provisioningState
      );
    });

    it("should create or update virtual machine", async () => {
      const result = await client.virtualMachines.createOrUpdate(
        RESOURCE_GROUP,
        vmName,
        {
          location: "eastus",
          properties: {
            metadata: {
              createdBy: "user@example.com",
              tags: { environment: "production" }
            }
          }
        }
      );
      assert.strictEqual(result.id, expectedVm.id);
      assert.strictEqual(result.name, expectedVm.name);
      assert.strictEqual(result.type, expectedVm.type);
      assert.strictEqual(result.location, expectedVm.location);
      assert.strictEqual(
        result.properties?.provisioningState,
        expectedVm.properties.provisioningState
      );
    });
  });

  describe("Storage StorageAccounts", () => {
    const accountName = "account1";
    const expectedAccount = {
      id: `/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP}/providers/Microsoft.Storage/storageAccounts/${accountName}`,
      name: accountName,
      type: "Microsoft.Storage/storageAccounts",
      location: "westus",
      properties: {
        provisioningState: "Succeeded",
        metadata: {
          createdAt: new Date("2025-01-02T00:00:00Z"),
          createdBy: "admin@example.com",
          tags: { department: "engineering" }
        }
      }
    };

    it("should get storage account", async () => {
      const result = await client.storageAccounts.get(RESOURCE_GROUP, accountName);
      assert.strictEqual(result.id, expectedAccount.id);
      assert.strictEqual(result.name, expectedAccount.name);
      assert.strictEqual(result.type, expectedAccount.type);
      assert.strictEqual(result.location, expectedAccount.location);
      assert.strictEqual(
        result.properties?.provisioningState,
        expectedAccount.properties.provisioningState
      );
    });

    it("should create or update storage account", async () => {
      const result = await client.storageAccounts.createOrUpdate(
        RESOURCE_GROUP,
        accountName,
        {
          location: "westus",
          properties: {
            metadata: {
              createdBy: "admin@example.com",
              tags: { department: "engineering" }
            }
          }
        }
      );
      assert.strictEqual(result.id, expectedAccount.id);
      assert.strictEqual(result.name, expectedAccount.name);
      assert.strictEqual(result.type, expectedAccount.type);
      assert.strictEqual(result.location, expectedAccount.location);
      assert.strictEqual(
        result.properties?.provisioningState,
        expectedAccount.properties.provisioningState
      );
    });
  });
});
