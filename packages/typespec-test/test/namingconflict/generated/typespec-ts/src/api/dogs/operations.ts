// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PetStoreContext as Client } from "../index.js";
import {
  DogsPet,
  dogsPetDeserializer,
  DogsBone,
  dogsBoneDeserializer,
} from "../../models/dogs/models.js";
import { DogsBoneOptionalParams, DogsPetOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _boneSend(
  context: Client,
  options: DogsBoneOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/dogs")
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _boneDeserialize(result: PathUncheckedResponse): Promise<DogsBone> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return dogsBoneDeserializer(result.body);
}

export async function bone(
  context: Client,
  options: DogsBoneOptionalParams = { requestOptions: {} },
): Promise<DogsBone> {
  const result = await _boneSend(context, options);
  return _boneDeserialize(result);
}

export function _petSend(
  context: Client,
  options: DogsPetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/dogs")
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _petDeserialize(result: PathUncheckedResponse): Promise<DogsPet> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return dogsPetDeserializer(result.body);
}

export async function pet(
  context: Client,
  options: DogsPetOptionalParams = { requestOptions: {} },
): Promise<DogsPet> {
  const result = await _petSend(context, options);
  return _petDeserialize(result);
}
