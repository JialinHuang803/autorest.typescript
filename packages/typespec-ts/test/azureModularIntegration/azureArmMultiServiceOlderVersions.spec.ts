import { assert } from "chai";
import { Combined } from "./generated/azure/resource-manager/multi-service-older-versions/src/index.js";

describe("Azure ARM MultiServiceOlderVersions", () => {
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
    const vmName = "vm-old1";
    const expectedVm = {
      id: `/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP}/providers/Microsoft.Compute/virtualMachinesOld/${vmName}`,
      name: vmName,
      type: "Microsoft.Compute/virtualMachinesOld",
      location: LOCATION,
      properties: {
        provisioningState: "Succeeded",
        size: "Standard_D2s_v3"
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
      assert.strictEqual(result.properties?.size, expectedVm.properties.size);
    });

    it("should create or update virtual machine", async () => {
      const result = await client.virtualMachines.createOrUpdate(
        RESOURCE_GROUP,
        vmName,
        {
          location: LOCATION,
          properties: {
            size: "Standard_D2s_v3"
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

  describe("ComputeDisk Disks", () => {
    const diskName = "disk-old1";
    const expectedDisk = {
      id: `/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP}/providers/Microsoft.Compute/disksOld/${diskName}`,
      name: diskName,
      type: "Microsoft.Compute/disksOld",
      location: LOCATION,
      properties: {
        provisioningState: "Succeeded",
        diskSizeGB: 128
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
      assert.strictEqual(
        result.properties?.diskSizeGB,
        expectedDisk.properties.diskSizeGB
      );
    });

    it("should create or update disk", async () => {
      const result = await client.disks.createOrUpdate(RESOURCE_GROUP, diskName, {
        location: LOCATION,
        properties: {
          diskSizeGB: 128
        }
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
