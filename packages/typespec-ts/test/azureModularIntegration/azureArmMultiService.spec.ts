import { assert } from "chai";
import { Combined } from "./generated/azure/resource-manager/multi-service/src/index.js";

describe("Azure ARM MultiService", () => {
  const SUBSCRIPTION_ID = "00000000-0000-0000-0000-000000000000";
  const RESOURCE_GROUP = "test-rg";
  const LOCATION = "eastus";

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
    const vmName = "vm1";
    const expectedVm = {
      id: `/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP}/providers/Microsoft.Compute/virtualMachines/${vmName}`,
      name: vmName,
      type: "Microsoft.Compute/virtualMachines",
      location: LOCATION,
      properties: {
        provisioningState: "Succeeded"
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
          location: LOCATION,
          properties: {}
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

  describe("ComputeDisk Disks", () => {
    const diskName = "disk1";
    const expectedDisk = {
      id: `/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP}/providers/Microsoft.Compute/disks/${diskName}`,
      name: diskName,
      type: "Microsoft.Compute/disks",
      location: LOCATION,
      properties: {
        provisioningState: "Succeeded"
      }
    };

    it("should get disk", async () => {
      const result = await client.disks.get(RESOURCE_GROUP, diskName);
      assert.strictEqual(result.id, expectedDisk.id);
      assert.strictEqual(result.name, expectedDisk.name);
      assert.strictEqual(result.type, expectedDisk.type);
      assert.strictEqual(result.location, expectedDisk.location);
      assert.strictEqual(
        result.properties?.provisioningState,
        expectedDisk.properties.provisioningState
      );
    });

    it("should create or update disk", async () => {
      const result = await client.disks.createOrUpdate(RESOURCE_GROUP, diskName, {
        location: LOCATION,
        properties: {}
      });
      assert.strictEqual(result.id, expectedDisk.id);
      assert.strictEqual(result.name, expectedDisk.name);
      assert.strictEqual(result.type, expectedDisk.type);
      assert.strictEqual(result.location, expectedDisk.location);
      assert.strictEqual(
        result.properties?.provisioningState,
        expectedDisk.properties.provisioningState
      );
    });
  });
});
