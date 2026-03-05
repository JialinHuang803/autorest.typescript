import { assert } from "chai";
import { Combined } from "./generated/azure/resource-manager/multi-service-older-versions/src/index.js";

describe("Azure ResourceManager MultiService OlderVersions", () => {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroup = "test-rg";
  const location = "eastus";
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
      const result = await client.virtualMachines.get(resourceGroup, "vm-old1");
      assert.strictEqual(result.name, "vm-old1");
      assert.strictEqual(result.location, location);
      assert.strictEqual(result.properties?.provisioningState, "Succeeded");
    });

    it("should create or update virtual machine", async () => {
      const result = await client.virtualMachines.createOrUpdate(
        resourceGroup,
        "vm-old1",
        {
          location,
          properties: {
            size: "Standard_D2s_v3"
          }
        }
      );
      assert.strictEqual(result.name, "vm-old1");
      assert.strictEqual(result.location, location);
      assert.strictEqual(result.properties?.provisioningState, "Succeeded");
    });
  });

  describe("ComputeDisk Disks", () => {
    it("should get disk", async () => {
      const result = await client.disks.get(resourceGroup, "disk-old1");
      assert.strictEqual(result.name, "disk-old1");
      assert.strictEqual(result.location, location);
      assert.strictEqual(result.properties?.provisioningState, "Succeeded");
    });

    it("should create or update disk", async () => {
      const result = await client.disks.createOrUpdate(
        resourceGroup,
        "disk-old1",
        {
          location,
          properties: {
            diskSizeGB: 128
          }
        }
      );
      assert.strictEqual(result.name, "disk-old1");
      assert.strictEqual(result.location, location);
      assert.strictEqual(result.properties?.provisioningState, "Succeeded");
    });
  });
});
