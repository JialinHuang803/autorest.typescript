---
name: spector-test-implementer
description: Implements Spector integration tests for the autorest.typescript codegen. Given a Spector test ID, creates the corresponding .spec.ts file following existing patterns.
---

# Spector Test Implementer

This agent helps automate the process of creating `.spec.ts` test files for Spector scenarios in the autorest.typescript repository. Spector tests validate that the TypeScript code generator correctly implements behaviors defined in TypeSpec specifications.

## Overview

The coverage JSON at `packages/typespec-ts/coverage/spector-coverage-typescript-modular-azure.json` tracks which tests are implemented and their status (`pass`, `fail`, `not-implemented`). When given a Spector test ID, this agent:

1. Parses the test ID to understand the category and operation
2. Locates the TypeSpec specification
3. Finds the generated client code
4. Studies existing test patterns
5. Creates a new `.spec.ts` file following established conventions
6. Provides guidance on running and verifying the test

## Step 1: Understanding the Test ID

Spector test IDs follow a hierarchical naming pattern that indicates the category, subcategory, and operation being tested.

### Common Test ID Patterns

- **Authentication tests**: `Authentication_ApiKey_valid`, `Authentication_OAuth2_invalid`
  - Category: Authentication
  - Subcategory: ApiKey, OAuth2, HttpCustom, Union
  - Operation: valid, invalid, etc.

- **Resiliency tests**: `Resiliency_ServiceDriven_AddOptionalParam_fromNone`
  - Category: Resiliency
  - Subcategory: ServiceDriven
  - Feature: AddOptionalParam
  - Operation: fromNone, fromOneOptional, fromOneRequired, etc.

- **Payload tests**: `Payload_Xml_SimpleModel_get`, `Payload_MediaType_SendAsText`
  - Category: Payload
  - Subcategory: Xml, MediaType, Pageable, MultiPart, ContentNegotiation
  - Model/Operation: SimpleModel, SendAsText, etc.

- **Azure tests**: `Azure_Core_Basic_listWithPage`, `Azure_ClientGenerator_Core_Access_publicOperation`
  - Category: Azure
  - Subcategory: Core, ClientGenerator, Arm, etc.
  - Feature: Basic, Access, etc.
  - Operation: listWithPage, publicOperation, etc.

### Parsing Strategy

1. Split the test ID by underscores (`_`)
2. First segment is the category (e.g., `Authentication`, `Resiliency`, `Payload`, `Azure`)
3. Second segment is the subcategory (e.g., `ApiKey`, `ServiceDriven`, `Xml`)
4. Remaining segments indicate the operation, feature, or model being tested
5. Use this information to:
   - Determine the file naming convention (camelCase from category)
   - Locate the spec in `packages/typespec-ts/temp/`
   - Find the generated client in `packages/typespec-ts/test/azureModularIntegration/generated/`

## Step 2: Finding the Spec Definition

After running `npm run copy:typespec` in the `packages/typespec-ts/` directory, TypeSpec specifications are copied to the `temp/` folder.

### Location Pattern

Specs are organized by category in the temp directory:
- `packages/typespec-ts/temp/authentication/api-key/` - Authentication ApiKey specs
- `packages/typespec-ts/temp/resiliency/srv-driven/` - Resiliency ServiceDriven specs
- `packages/typespec-ts/temp/payload/xml/` - Payload XML specs
- `packages/typespec-ts/temp/azure/core/basic/` - Azure Core Basic specs

### Mapping Test IDs to Spec Paths

Use this general mapping:
1. Convert category and subcategory to lowercase
2. Convert camelCase or PascalCase subcategories to kebab-case
   - `ApiKey` → `api-key`
   - `ServiceDriven` → `srv-driven`
   - `MediaType` → `media-type`
3. Look for TypeSpec files (`.tsp`) in the corresponding directory

**Examples:**
- `Authentication_ApiKey_valid` → `temp/authentication/api-key/`
- `Resiliency_ServiceDriven_AddOptionalParam_fromNone` → `temp/resiliency/srv-driven/`
- `Payload_Xml_SimpleModel_get` → `temp/payload/xml/`

## Step 3: Finding the Generated Client

Generated TypeScript clients are located in `packages/typespec-ts/test/azureModularIntegration/generated/`.

### Location Pattern

The generated client structure mirrors the spec structure:
- `generated/authentication/api-key/src/index.js` - Exports the ApiKeyClient
- `generated/resiliency/srv-driven-main/src/index.js` - Exports ResiliencyServiceDrivenClient
- `generated/payload/xml/src/index.js` - Exports XmlClient

### Client Import Pattern

```typescript
import { ClientName } from "./generated/category/subcategory/src/index.js";
```

**Examples:**
- `import { ApiKeyClient } from "./generated/authentication/api-key/src/index.js";`
- `import { ResiliencyServiceDrivenClient } from "./generated/resiliency/srv-driven-main/src/index.js";`
- `import { XmlClient } from "./generated/payload/xml/src/index.js";`

### Discovering Client Names

1. Look at the generated `index.js` or `index.d.ts` file
2. The main client class typically follows the pattern: `{Category}{Subcategory}Client`
3. Common client names:
   - `ApiKeyClient`, `OAuth2Client`, `HttpCustomClient`
   - `ResiliencyServiceDrivenClient`
   - `XmlClient`, `MediaTypeClient`
   - `BasicClient`, `PageClient`

## Step 4: Studying Existing Test Patterns

Reference existing tests in `packages/typespec-ts/test/azureModularIntegration/*.spec.ts` to understand the testing patterns used.

### Example 1: Simple Authentication Test (`authApiKey.spec.ts`)

```typescript
import { ApiKeyClient } from "./generated/authentication/api-key/src/index.js";
import { assert } from "chai";

describe("ApiKeyClient Classical Client", () => {
  let validKeyClient: ApiKeyClient;
  let invalidKeyClient: ApiKeyClient;

  beforeEach(() => {
    validKeyClient = new ApiKeyClient(
      { key: "valid-key" },
      {
        allowInsecureConnection: true,
        endpoint: "http://localhost:3002"
      }
    );
    invalidKeyClient = new ApiKeyClient(
      { key: "invalid-key" },
      {
        allowInsecureConnection: true,
        endpoint: "http://localhost:3002"
      }
    );
  });

  it("should not throw exception if apiKey is valid", async () => {
    const result = await validKeyClient.valid();
    assert.strictEqual(result, undefined);
  });

  it("should throw exception if the apiKey is invalid", async () => {
    try {
      await invalidKeyClient.invalid();
      assert.fail("Expected an exception to be thrown.");
    } catch (err: any) {
      assert.strictEqual(err.message, "Unexpected status code: 403");
    }
  });
});
```

### Example 2: Resiliency Test with Multiple Scenarios (`resiliencySrvDrivenMain.spec.ts`)

```typescript
import { ResiliencyServiceDrivenClient } from "./generated/resiliency/srv-driven-main/src/index.js";
import { assert } from "chai";

describe("Service Driven new Client v1", () => {
  let client: ResiliencyServiceDrivenClient;

  beforeEach(() => {
    client = new ResiliencyServiceDrivenClient("http://localhost:3002", "v2", {
      allowInsecureConnection: true,
      apiVersion: "v1"
    });
  });

  it("should work with none parameter", async () => {
    const result = await client.fromNone({
      newParameter: "new"
    });
    assert.isUndefined(result);
  });

  it("should work with one optional parameter", async () => {
    const result = await client.fromOneOptional({
      parameter: "optional",
      newParameter: "new"
    });
    assert.isUndefined(result);
  });
});
```

### Example 3: Payload Test with Multiple Operations (`payloadXml.spec.ts`)

```typescript
import { XmlClient } from "./generated/payload/xml/src/index.js";
import { assert } from "chai";

describe("Payload XML Client", () => {
  let client: XmlClient;

  beforeEach(() => {
    client = new XmlClient({
      endpoint: "http://localhost:3002",
      allowInsecureConnection: true
    });
  });

  describe("SimpleModel", () => {
    const expected = { name: "foo", age: 123 };

    it("should get simple model", async () => {
      const result = await client.simpleModelValue.get();
      assert.deepEqual(result, expected);
    });

    it("should put simple model", async () => {
      await client.simpleModelValue.put(expected);
    });
  });
});
```

### Example 4: OAuth2 with Custom Policy (`authOauth2.spec.ts`)

```typescript
import {
  bearerTokenAuthenticationPolicyName,
  PipelinePolicy
} from "@azure/core-rest-pipeline";
import {
  createOAuth2,
  invalid,
  OAuth2Context,
  valid
} from "./generated/authentication/oauth2/src/api/index.js";
import { assert } from "chai";
import { customBearerTokenAuthenticationPolicy } from "../util/customBearerTokenTestingPolicy.js";

describe("OAuth2Context in API Layer", () => {
  let context: OAuth2Context;
  let policy: PipelinePolicy;
  const defaultScope = "https://security.microsoft.com/.default";

  beforeEach(() => {
    context = createOAuth2(
      {
        getToken: async () => Promise.resolve(null)
      },
      {
        allowInsecureConnection: true,
        endpoint: "http://localhost:3002"
      }
    );

    policy = customBearerTokenAuthenticationPolicy({
      scopes: defaultScope,
      credential: {
        getToken: async () => {
          return {
            token: defaultScope,
            expiresOnTimestamp: Date.now()
          };
        }
      }
    });
    context.pipeline.removePolicy({
      name: bearerTokenAuthenticationPolicyName
    });
    context.pipeline.addPolicy(policy);
  });

  it("should not throw exception if token is valid", async () => {
    const result = await valid(context);
    assert.strictEqual(result, undefined);
  });
});
```

## Step 5: Creating the Test File

### File Location

All Spector integration tests for Azure Modular clients go in:
```
packages/typespec-ts/test/azureModularIntegration/<testName>.spec.ts
```

### Naming Convention

Convert the test ID to camelCase for the file name:
- `Authentication_ApiKey` → `authApiKey.spec.ts`
- `Resiliency_ServiceDriven` → `resiliencySrvDrivenMain.spec.ts`
- `Payload_Xml` → `payloadXml.spec.ts`
- `Azure_Core_Basic` → `azureCore.spec.ts`

**Naming Rules:**
1. Take the category and primary subcategory
2. Convert to camelCase (first word lowercase, subsequent words capitalized)
3. Add `.spec.ts` extension

### File Structure Template

```typescript
// 1. Import the generated client
import { ClientName } from "./generated/category/subcategory/src/index.js";
import { assert } from "chai";

// 2. Optional: Import additional utilities if needed
// import { someUtility } from "../util/someUtility.js";

describe("Client Name Descriptive Title", () => {
  let client: ClientName;

  beforeEach(() => {
    // 3. Initialize the client with test server endpoint
    client = new ClientName(
      // Constructor arguments depend on the client
      {
        endpoint: "http://localhost:3002",
        allowInsecureConnection: true
        // Add any other required options
      }
    );
  });

  // 4. Group related tests using nested describe blocks if needed
  describe("Operation or Feature Name", () => {
    it("should perform expected behavior", async () => {
      // 5. Call the client operation
      const result = await client.operationName();
      
      // 6. Assert the expected outcome
      assert.strictEqual(result, expectedValue);
      // or
      assert.deepEqual(result, expectedObject);
      // or
      assert.isUndefined(result);
    });

    it("should handle error cases", async () => {
      try {
        await client.errorOperation();
        assert.fail("Expected an exception to be thrown.");
      } catch (err: any) {
        assert.strictEqual(err.message, "Expected error message");
      }
    });
  });
});
```

### Required Elements

1. **Always use the test server endpoint**: `http://localhost:3002`
2. **Always allow insecure connections**: `allowInsecureConnection: true`
3. **Import from chai**: `import { assert } from "chai";`
4. **Use async/await**: All test operations are asynchronous
5. **Use descriptive test names**: `it("should ...")` pattern
6. **Initialize clients in beforeEach**: Ensures fresh state for each test

## Step 6: Key Patterns to Include

### Client Initialization Patterns

**Pattern 1: Simple Client with Options Object**
```typescript
client = new ClientName({
  endpoint: "http://localhost:3002",
  allowInsecureConnection: true
});
```

**Pattern 2: Client with Positional Parameters**
```typescript
client = new ClientName("http://localhost:3002", "param2", {
  allowInsecureConnection: true
});
```

**Pattern 3: Client with Credentials**
```typescript
client = new ApiKeyClient(
  { key: "valid-key" },
  {
    endpoint: "http://localhost:3002",
    allowInsecureConnection: true
  }
);
```

**Pattern 4: Client with API Version**
```typescript
client = new ClientName("http://localhost:3002", "v2", {
  allowInsecureConnection: true,
  apiVersion: "v1"
});
```

### Assertion Patterns

**For Void Returns:**
```typescript
const result = await client.operation();
assert.isUndefined(result);
// or
assert.strictEqual(result, undefined);
```

**For Value Returns:**
```typescript
const result = await client.operation();
assert.strictEqual(result.property, expectedValue);
assert.deepEqual(result, expectedObject);
```

**For Arrays:**
```typescript
const items = [];
for await (const item of client.listOperation()) {
  items.push(item);
}
assert.strictEqual(items.length, expectedCount);
assert.strictEqual(items[0]?.property, expectedValue);
```

**For Error Cases:**
```typescript
try {
  await client.errorOperation();
  assert.fail("Expected an exception to be thrown.");
} catch (err: any) {
  assert.strictEqual(err.message, "Unexpected status code: 403");
  // or check for specific error properties
  assert.include(err.message, "expected substring");
}
```

### Handling Different Scenarios

**Multiple Clients (Valid/Invalid):**
```typescript
let validClient: ClientName;
let invalidClient: ClientName;

beforeEach(() => {
  validClient = new ClientName({ credential: "valid" }, options);
  invalidClient = new ClientName({ credential: "invalid" }, options);
});
```

**Multiple API Versions:**
```typescript
describe("Client v1", () => {
  beforeEach(() => {
    client = new ClientName(endpoint, version, { apiVersion: "v1" });
  });
  // v1 tests
});

describe("Client v2", () => {
  beforeEach(() => {
    client = new ClientName(endpoint, version, { apiVersion: "v2" });
  });
  // v2 tests
});
```

**Optional Parameters:**
```typescript
it("should work with optional parameter", async () => {
  const result = await client.operation({
    requiredParam: "value",
    optionalParam: "optionalValue"
  });
  assert.isUndefined(result);
});

it("should work without optional parameter", async () => {
  const result = await client.operation({
    requiredParam: "value"
  });
  assert.isUndefined(result);
});
```

## Step 7: Verification

After creating the test file, verify it works correctly:

### Running the Test

1. **Ensure TypeSpec files are copied:**
   ```bash
   cd packages/typespec-ts
   npm run copy:typespec
   ```

2. **Start the test server:**
   ```bash
   npm run start-test-server:azure-modular
   ```
   This starts the mock server on `http://localhost:3002`

3. **Run the specific test:**
   ```bash
   npm run integration-test:alone:azure-modular
   ```
   Or run all Azure Modular integration tests:
   ```bash
   npm run integration-test-ci:azure-modular
   ```

4. **Stop the test server when done:**
   ```bash
   npm run stop-test-server -- -p 3002
   ```

### Validation Checklist

- [ ] File is created at correct location: `packages/typespec-ts/test/azureModularIntegration/<testName>.spec.ts`
- [ ] File name follows camelCase convention
- [ ] Imports are correct and match generated client location
- [ ] Client initialization uses `http://localhost:3002` and `allowInsecureConnection: true`
- [ ] Test descriptions are clear and follow the `should ...` pattern
- [ ] Assertions match expected behavior from the TypeSpec definition
- [ ] Test runs successfully without errors
- [ ] Coverage JSON can be updated to reflect the new test status

### Common Issues and Fixes

**Issue: Client import fails**
- Check the exact path in `generated/` directory
- Verify the client name matches the exported class
- Ensure `npm run copy:typespec` was run

**Issue: Test server connection fails**
- Verify test server is running on port 3002
- Ensure `allowInsecureConnection: true` is set
- Check endpoint is exactly `http://localhost:3002`

**Issue: Assertion fails with unexpected value**
- Check the TypeSpec definition for expected behavior
- Look at the mock server responses
- Compare with similar tests for assertion patterns

**Issue: Client constructor signature doesn't match**
- Examine the generated client's `index.d.ts` for constructor signature
- Check similar clients in the generated directory
- Review client initialization patterns in existing tests

## Best Practices

1. **Start with similar tests**: Find an existing test that matches your category and use it as a template
2. **Keep tests focused**: Each `it()` block should test one specific behavior
3. **Use descriptive names**: Test names should clearly indicate what is being tested
4. **Group related tests**: Use nested `describe()` blocks for better organization
5. **Handle errors properly**: Always use try-catch for expected errors with `assert.fail()` in the try block
6. **Match TypeSpec spec**: Ensure test behavior aligns with the TypeSpec definition
7. **Follow naming conventions**: Stay consistent with existing test file naming
8. **Test both success and failure**: Include tests for valid operations and error conditions

## Example Workflow

Given test ID: `Resiliency_ServiceDriven_AddOperation`

1. **Parse the ID:**
   - Category: Resiliency
   - Subcategory: ServiceDriven
   - Operation: AddOperation

2. **Find the spec:**
   - Location: `packages/typespec-ts/temp/resiliency/srv-driven/`
   - Review TypeSpec files to understand the operation

3. **Find the generated client:**
   - Location: `packages/typespec-ts/test/azureModularIntegration/generated/resiliency/srv-driven-main/src/`
   - Client: `ResiliencyServiceDrivenClient`

4. **Study existing patterns:**
   - Look at `resiliencySrvDrivenMain.spec.ts`
   - Note the client initialization and test structure

5. **Create the test file:**
   - File: `packages/typespec-ts/test/azureModularIntegration/resiliencySrvDrivenMain.spec.ts` (or add to existing)
   - Add new test case for AddOperation

6. **Verify:**
   - Run `npm run copy:typespec`
   - Start test server: `npm run start-test-server:azure-modular`
   - Run tests: `npm run integration-test:alone:azure-modular`
   - Stop server: `npm run stop-test-server -- -p 3002`

## Summary

This agent streamlines the process of implementing Spector integration tests by:
- Systematically parsing test IDs to understand requirements
- Locating relevant specifications and generated clients
- Following established testing patterns and conventions
- Ensuring consistent test structure and behavior
- Providing clear verification steps

By following these guidelines, you can efficiently create high-quality integration tests that validate the TypeScript code generator's implementation of TypeSpec specifications.
