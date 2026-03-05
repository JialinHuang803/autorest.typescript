import { assert } from "chai";
import { Combined } from "./generated/azure/resource-manager/multi-service-older-versions/src/index.js";

describe("Azure ARM MultiService OlderVersions Client", () => {
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

  describe("VirtualMachines (older versions)", () => {
    it("should get a virtual machine (older version)", async () => {
      const result = await client.virtualMachines.get(
        RESOURCE_GROUP,
        "vm-old1"
      );
      assert.strictEqual(result.name, "vm-old1");
      assert.strictEqual(result.location, LOCATION);
      assert.strictEqual(result.properties?.provisioningState, "Succeeded");
    });

    it("should create or update a virtual machine (older version)", async () => {
      const result = await client.virtualMachines.createOrUpdate(
        RESOURCE_GROUP,
        "vm-old1",
        {
          location: LOCATION,
          properties: {
            size: "Standard_D2s_v3"
          }
        }
      );
      assert.strictEqual(result.name, "vm-old1");
      assert.strictEqual(result.location, LOCATION);
      assert.strictEqual(result.properties?.provisioningState, "Succeeded");
    });
  });

  describe("Disks (older versions)", () => {
    it("should get a disk (older version)", async () => {
      const result = await client.disks.get(RESOURCE_GROUP, "disk-old1");
      assert.strictEqual(result.name, "disk-old1");
      assert.strictEqual(result.location, LOCATION);
      assert.strictEqual(result.properties?.provisioningState, "Succeeded");
    });

    it("should create or update a disk (older version)", async () => {
      const result = await client.disks.createOrUpdate(
        RESOURCE_GROUP,
        "disk-old1",
        {
          location: LOCATION,
          properties: {
            diskSizeGB: 128
          }
        }
      );
      assert.strictEqual(result.name, "disk-old1");
      assert.strictEqual(result.location, LOCATION);
      assert.strictEqual(result.properties?.provisioningState, "Succeeded");
    });
  });
});
