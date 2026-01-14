// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PetStoreContext } from "../../api/petStoreContext.js";
import { fish, pet } from "../../api/cats/operations.js";
import { CatsFishOptionalParams, CatsPetOptionalParams } from "../../api/cats/options.js";
import { CatsPet, CatsFish } from "../../models/cats/models.js";

/** Interface representing a Cats operations. */
export interface CatsOperations {
  fish: (options?: CatsFishOptionalParams) => Promise<CatsFish>;
  pet: (options?: CatsPetOptionalParams) => Promise<CatsPet>;
}

function _getCats(context: PetStoreContext) {
  return {
    fish: (options?: CatsFishOptionalParams) => fish(context, options),
    pet: (options?: CatsPetOptionalParams) => pet(context, options),
  };
}

export function _getCatsOperations(context: PetStoreContext): CatsOperations {
  return {
    ..._getCats(context),
  };
}
