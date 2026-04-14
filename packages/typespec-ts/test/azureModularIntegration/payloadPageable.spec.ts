import { PageableClient, Pet, XmlPet } from "./generated/payload/pageable/src/index.js";
import { assert } from "chai";

describe("PageableClient", () => {
  let client: PageableClient;

  beforeEach(() => {
    client = new PageableClient({
      endpoint: "http://localhost:3002",
      allowInsecureConnection: true,
      retryOptions: {
        maxRetries: 0
      }
    });
  });

  const allPets = [
    { id: "1", name: "dog" },
    { id: "2", name: "cat" },
    { id: "3", name: "bird" },
    { id: "4", name: "fish" }
  ];

  const firstPagePets = [
    { id: "1", name: "dog" },
    { id: "2", name: "cat" }
  ];

  describe("ServerDrivenPagination", () => {
    it("should paginate with link", async () => {
      const iter = client.serverDrivenPagination.link();
      const items: Array<Pet> = [];
      for await (const user of iter) {
        items.push(user);
      }
      assert.strictEqual(items.length, 4);
      assert.deepStrictEqual<Pet[]>(items, allPets);
    });

    it("should paginate with linkString", async () => {
      const iter = client.serverDrivenPagination.linkString();
      const items: Array<Pet> = [];
      for await (const item of iter) {
        items.push(item);
      }
      assert.strictEqual(items.length, 4);
      assert.deepStrictEqual<Pet[]>(items, allPets);
    });

    it("should paginate with nestedLink", async () => {
      const iter = client.serverDrivenPagination.nestedLink();
      const items: Array<Pet> = [];
      for await (const item of iter) {
        items.push(item);
      }
      assert.strictEqual(items.length, 4);
      assert.deepStrictEqual<Pet[]>(items, allPets);
    });

    describe("ContinuationToken", () => {
      it("should paginate with requestQueryResponseBody", async () => {
        const iter = client.serverDrivenPagination.continuationToken.requestQueryResponseBody({
          foo: "foo",
          bar: "bar"
        });
        const items: Array<Pet> = [];
        for await (const item of iter) {
          items.push(item);
        }
        assert.strictEqual(items.length, 4);
      });

      it("should paginate with requestHeaderResponseBody", async () => {
        const iter = client.serverDrivenPagination.continuationToken.requestHeaderResponseBody({
          foo: "foo",
          bar: "bar"
        });
        const items: Array<Pet> = [];
        for await (const item of iter) {
          items.push(item);
        }
        assert.strictEqual(items.length, 4);
      });

      it("should paginate with requestQueryResponseHeader", async () => {
        const iter = client.serverDrivenPagination.continuationToken.requestQueryResponseHeader({
          foo: "foo",
          bar: "bar"
        });
        const items: Array<Pet> = [];
        for await (const item of iter) {
          items.push(item);
        }
        assert.strictEqual(items.length, 4);
      });

      it("should paginate with requestHeaderResponseHeader", async () => {
        const iter = client.serverDrivenPagination.continuationToken.requestHeaderResponseHeader({
          foo: "foo",
          bar: "bar"
        });
        const items: Array<Pet> = [];
        for await (const item of iter) {
          items.push(item);
        }
        assert.strictEqual(items.length, 4);
      });

      it("should paginate with requestQueryNestedResponseBody", async () => {
        const iter =
          client.serverDrivenPagination.continuationToken.requestQueryNestedResponseBody({
            foo: "foo",
            bar: "bar"
          });
        const items: Array<Pet> = [];
        for await (const item of iter) {
          items.push(item);
        }
        assert.strictEqual(items.length, 4);
      });

      it("should paginate with requestHeaderNestedResponseBody", async () => {
        const iter =
          client.serverDrivenPagination.continuationToken.requestHeaderNestedResponseBody({
            foo: "foo",
            bar: "bar"
          });
        const items: Array<Pet> = [];
        for await (const item of iter) {
          items.push(item);
        }
        assert.strictEqual(items.length, 4);
      });
    });
  });

  describe("PageSize", () => {
    it("should list without continuation", async () => {
      const iter = client.pageSize.listWithoutContinuation();
      const items: Array<Pet> = [];
      for await (const item of iter) {
        items.push(item);
      }
      assert.strictEqual(items.length, 4);
      assert.deepStrictEqual<Pet[]>(items, allPets);
    });

    it("should list with page size", async () => {
      const iter = client.pageSize.listWithPageSize({ pageSize: 2 });
      const items: Array<Pet> = [];
      for await (const item of iter) {
        items.push(item);
      }
      assert.strictEqual(items.length, 2);
      assert.deepStrictEqual<Pet[]>(items, firstPagePets);
    });
  });

  describe("XmlPagination", () => {
    it("should list with continuation (XML)", async () => {
      const iter = client.xmlPagination.listWithContinuation();
      const items: Array<XmlPet> = [];
      for await (const item of iter) {
        items.push(item);
      }
      assert.strictEqual(items.length, 4);
    });

    it("should list with next link (XML)", async () => {
      const iter = client.xmlPagination.listWithNextLink();
      const items: Array<XmlPet> = [];
      for await (const item of iter) {
        items.push(item);
      }
      assert.strictEqual(items.length, 4);
    });
  });
});
