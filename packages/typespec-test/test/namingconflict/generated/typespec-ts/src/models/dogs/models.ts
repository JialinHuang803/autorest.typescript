// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** model interface DogsPet */
export interface DogsPet {
  name: string;
}

export function dogsPetDeserializer(item: any): DogsPet {
  return {
    name: item["name"],
  };
}

/** model interface DogsTest */
export interface DogsTest {
  name: string;
}

export function dogsTestDeserializer(item: any): DogsTest {
  return {
    name: item["name"],
  };
}
