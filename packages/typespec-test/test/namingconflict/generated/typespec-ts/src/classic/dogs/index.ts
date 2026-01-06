// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PetStoreContext } from "../../api/petStoreContext.js";
import { test, pet } from "../../api/dogs/operations.js";
import { DogsTestOptionalParams, DogsPetOptionalParams } from "../../api/dogs/options.js";
import { DogsPet, DogsTest } from "../../models/dogs/models.js";
import { DogsAnotherDogsOperations, _getDogsAnotherDogsOperations } from "./anotherDogs/index.js";

/** Interface representing a Dogs operations. */
export interface DogsOperations {
  test: (options?: DogsTestOptionalParams) => Promise<DogsTest>;
  pet: (options?: DogsPetOptionalParams) => Promise<DogsPet>;
  anotherDogs: DogsAnotherDogsOperations;
}

function _getDogs(context: PetStoreContext) {
  return {
    test: (options?: DogsTestOptionalParams) => test(context, options),
    pet: (options?: DogsPetOptionalParams) => pet(context, options),
  };
}

export function _getDogsOperations(context: PetStoreContext): DogsOperations {
  return {
    ..._getDogs(context),
    anotherDogs: _getDogsAnotherDogsOperations(context),
  };
}
