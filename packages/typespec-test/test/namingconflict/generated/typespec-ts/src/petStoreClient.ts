// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPetStore, PetStoreContext, PetStoreClientOptionalParams } from "./api/index.js";
import { CatsOperations, _getCatsOperations } from "./classic/cats/index.js";
import { DogsOperations, _getDogsOperations } from "./classic/dogs/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";

export { PetStoreClientOptionalParams } from "./api/petStoreContext.js";

export class PetStoreClient {
  private _client: PetStoreContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(endpointParam: string, options: PetStoreClientOptionalParams = {}) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createPetStore(endpointParam, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.cats = _getCatsOperations(this._client);
    this.dogs = _getDogsOperations(this._client);
  }

  /** The operation groups for cats */
  public readonly cats: CatsOperations;
  /** The operation groups for dogs */
  public readonly dogs: DogsOperations;
}
