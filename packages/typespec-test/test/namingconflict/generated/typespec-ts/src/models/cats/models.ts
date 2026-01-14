// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** model interface CatsPet */
export interface CatsPet {
  name: string;
}

export function catsPetDeserializer(item: any): CatsPet {
  return {
    name: item["name"],
  };
}

/** model interface CatsFish */
export interface CatsFish {
  type: string;
}

export function catsFishDeserializer(item: any): CatsFish {
  return {
    type: item["type"],
  };
}
