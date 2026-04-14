import { assert } from "chai";
import { Combined } from "./generated/azure/resource-manager/multi-service-older-versions/src/index.js";

describe("Azure Resource Manager MultiServiceOlderVersions Client", () => {
  let client: Combined;

  const SUBSCRIPTION_ID = "00000000-0000-0000-0000-000000000000";
  const RESOURCE_GROUP = "test-rg";

  const expectedVirtualMachine = {
    id: `/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP}/providers/Microsoft.Compute/virtualMachinesOld/vm-old1`,
    name: "vm-old1",
    location: "eastus"
  };

  const expectedDisk = {
    id: `/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP}/providers/Microsoft.Compute/disksOld/disk-old1`,
    name: "disk-old1",
    location: "eastus"
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
    const result = await client.virtualMachines.get(RESOURCE_GROUP, "vm-old1");
    assert.strictEqual(result.id, expectedVirtualMachine.id);
    assert.strictEqual(result.name, expectedVirtualMachine.name);
    assert.strictEqual(result.location, expectedVirtualMachine.location);
  });

  it("should create or update virtual machine", async () => {
    const poller = client.virtualMachines.createOrUpdate(
      RESOURCE_GROUP,
      "vm-old1",
      {
        location: "eastus",
        properties: {
          size: "Standard_D2s_v3"
        }
      }
    );
    const result = await poller.pollUntilDone();
    assert.strictEqual(result.name, expectedVirtualMachine.name);
  });

  it("should get disk", async () => {
    const result = await client.disks.get(RESOURCE_GROUP, "disk-old1");
    assert.strictEqual(result.id, expectedDisk.id);
    assert.strictEqual(result.name, expectedDisk.name);
    assert.strictEqual(result.location, expectedDisk.location);
  });

  it("should create or update disk", async () => {
    const poller = client.disks.createOrUpdate(
      RESOURCE_GROUP,
      "disk-old1",
      {
        location: "eastus",
        properties: {
          diskSizeGB: 128
        }
      }
    );
    const result = await poller.pollUntilDone();
    assert.strictEqual(result.name, expectedDisk.name);
  });
});
