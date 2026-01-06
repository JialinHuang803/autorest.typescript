// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { PetStoreClient } from "./petStoreClient.js";
export { CatsPet } from "./models/cats/index.js";
export { DogsPet, DogsTest } from "./models/dogs/index.js";
export { DogsAnotherDogsTest, DogsAnotherDogsPet } from "./models/dogs/anotherDogs/index.js";
export { PetStoreClientOptionalParams } from "./api/index.js";
export { CatsPetOptionalParams } from "./api/cats/index.js";
export { DogsTestOptionalParams, DogsPetOptionalParams } from "./api/dogs/index.js";
export {
  DogsAnotherDogsPetOptionalParams,
  DogsAnotherDogsGetTestOptionalParams,
} from "./api/dogs/anotherDogs/index.js";
export { CatsOperations, DogsOperations, DogsAnotherDogsOperations } from "./classic/index.js";
