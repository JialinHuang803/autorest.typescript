// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** model interface DogsAnotherDogsPet */
export interface DogsAnotherDogsPet {
  name: string;
  type: string;
}

export function dogsAnotherDogsPetDeserializer(item: any): DogsAnotherDogsPet {
  return {
    name: item["name"],
    type: item["type"],
  };
}
