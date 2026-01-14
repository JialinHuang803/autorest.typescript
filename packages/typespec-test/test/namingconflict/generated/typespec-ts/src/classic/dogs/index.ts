// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PetStoreContext } from "../../api/petStoreContext.js";
import { bone, pet } from "../../api/dogs/operations.js";
import { DogsBoneOptionalParams, DogsPetOptionalParams } from "../../api/dogs/options.js";
import { DogsPet, DogsBone } from "../../models/dogs/models.js";
import { DogsAnotherDogsOperations, _getDogsAnotherDogsOperations } from "./anotherDogs/index.js";

/** Interface representing a Dogs operations. */
export interface DogsOperations {
  bone: (options?: DogsBoneOptionalParams) => Promise<DogsBone>;
  pet: (options?: DogsPetOptionalParams) => Promise<DogsPet>;
  anotherDogs: DogsAnotherDogsOperations;
}

function _getDogs(context: PetStoreContext) {
  return {
    bone: (options?: DogsBoneOptionalParams) => bone(context, options),
    pet: (options?: DogsPetOptionalParams) => pet(context, options),
  };
}

export function _getDogsOperations(context: PetStoreContext): DogsOperations {
  return {
    ..._getDogs(context),
    anotherDogs: _getDogsAnotherDogsOperations(context),
  };
}
