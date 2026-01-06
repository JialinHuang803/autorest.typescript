// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PetStoreContext } from "../../../api/petStoreContext.js";
import { pet, getTest } from "../../../api/dogs/anotherDogs/operations.js";
import {
  DogsAnotherDogsPetOptionalParams,
  DogsAnotherDogsGetTestOptionalParams,
} from "../../../api/dogs/anotherDogs/options.js";
import {
  DogsAnotherDogsTest,
  DogsAnotherDogsPet,
} from "../../../models/dogs/anotherDogs/models.js";

/** Interface representing a DogsAnotherDogs operations. */
export interface DogsAnotherDogsOperations {
  pet: (options?: DogsAnotherDogsPetOptionalParams) => Promise<DogsAnotherDogsPet>;
  getTest: (options?: DogsAnotherDogsGetTestOptionalParams) => Promise<DogsAnotherDogsTest>;
}

function _getDogsAnotherDogs(context: PetStoreContext) {
  return {
    pet: (options?: DogsAnotherDogsPetOptionalParams) => pet(context, options),
    getTest: (options?: DogsAnotherDogsGetTestOptionalParams) => getTest(context, options),
  };
}

export function _getDogsAnotherDogsOperations(context: PetStoreContext): DogsAnotherDogsOperations {
  return {
    ..._getDogsAnotherDogs(context),
  };
}
