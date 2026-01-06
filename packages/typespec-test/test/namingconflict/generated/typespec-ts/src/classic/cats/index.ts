// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PetStoreContext } from "../../api/petStoreContext.js";
import { pet } from "../../api/cats/operations.js";
import { CatsPetOptionalParams } from "../../api/cats/options.js";
import { CatsPet } from "../../models/cats/models.js";

/** Interface representing a Cats operations. */
export interface CatsOperations {
  pet: (options?: CatsPetOptionalParams) => Promise<CatsPet>;
}

function _getCats(context: PetStoreContext) {
  return {
    pet: (options?: CatsPetOptionalParams) => pet(context, options),
  };
}

export function _getCatsOperations(context: PetStoreContext): CatsOperations {
  return {
    ..._getCats(context),
  };
}
