import { assert } from "chai";
import { Combined } from "./generated/azure/resource-manager/multi-service-shared-models/src/index.js";

describe("Azure Resource Manager MultiServiceSharedModels Client", () => {
  let client: Combined;

  const SUBSCRIPTION_ID = "00000000-0000-0000-0000-000000000000";
  const RESOURCE_GROUP = "test-rg";

  const expectedVirtualMachine = {
    id: `/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP}/providers/Microsoft.Compute/virtualMachinesShared/vm-shared1`,
    name: "vm-shared1",
    location: "eastus",
    properties: {
      provisioningState: "Succeeded"
    }
  };

  const expectedStorageAccount = {
    id: `/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP}/providers/Microsoft.Storage/storageAccounts/account1`,
    name: "account1",
    location: "westus",
    properties: {
      provisioningState: "Succeeded"
    }
  };

  beforeEach(() => {
    client = new Combined(SUBSCRIPTION_ID, {
      endpoint: "http://localhost:3002",
      allowInsecureConnection: true,
      retryOptions: {
        maxRetries: 0
      }
    });
  });

  it("should get virtual machine", async () => {
    const result = await client.virtualMachines.get(RESOURCE_GROUP, "vm-shared1");
    assert.strictEqual(result.id, expectedVirtualMachine.id);
    assert.strictEqual(result.name, expectedVirtualMachine.name);
    assert.strictEqual(result.location, expectedVirtualMachine.location);
  });

  it("should create or update virtual machine", async () => {
    const poller = client.virtualMachines.createOrUpdate(
      RESOURCE_GROUP,
      "vm-shared1",
      {
        location: "eastus",
        properties: {}
      }
    );
    const result = await (await poller).pollUntilDone();
    assert.strictEqual(result.name, expectedVirtualMachine.name);
  });

  it("should get storage account", async () => {
    const result = await client.storageAccounts.get(RESOURCE_GROUP, "account1");
    assert.strictEqual(result.id, expectedStorageAccount.id);
    assert.strictEqual(result.name, expectedStorageAccount.name);
    assert.strictEqual(result.location, expectedStorageAccount.location);
  });

  it("should create or update storage account", async () => {
    const poller = client.storageAccounts.createOrUpdate(
      RESOURCE_GROUP,
      "account1",
      {
        location: "westus",
        properties: {}
      }
    );
    const result = await (await poller).pollUntilDone();
    assert.strictEqual(result.name, expectedStorageAccount.name);
  });
});
