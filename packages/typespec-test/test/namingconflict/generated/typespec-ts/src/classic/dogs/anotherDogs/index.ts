// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PetStoreContext } from "../../../api/petStoreContext.js";
import { pet } from "../../../api/dogs/anotherDogs/operations.js";
import { DogsAnotherDogsPetOptionalParams } from "../../../api/dogs/anotherDogs/options.js";
import { DogsAnotherDogsPet } from "../../../models/dogs/anotherDogs/models.js";

/** Interface representing a DogsAnotherDogs operations. */
export interface DogsAnotherDogsOperations {
  pet: (options?: DogsAnotherDogsPetOptionalParams) => Promise<DogsAnotherDogsPet>;
}

function _getDogsAnotherDogs(context: PetStoreContext) {
  return {
    pet: (options?: DogsAnotherDogsPetOptionalParams) => pet(context, options),
  };
}

export function _getDogsAnotherDogsOperations(context: PetStoreContext): DogsAnotherDogsOperations {
  return {
    ..._getDogsAnotherDogs(context),
  };
}
