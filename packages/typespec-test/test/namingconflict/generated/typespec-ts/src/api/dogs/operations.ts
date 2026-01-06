// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PetStoreContext as Client } from "../index.js";
import {
  DogsPet,
  dogsPetDeserializer,
  DogsTest,
  dogsTestDeserializer,
} from "../../models/dogs/models.js";
import { DogsTestOptionalParams, DogsPetOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _testSend(
  context: Client,
  options: DogsTestOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/dogs")
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _testDeserialize(result: PathUncheckedResponse): Promise<DogsTest> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return dogsTestDeserializer(result.body);
}

export async function test(
  context: Client,
  options: DogsTestOptionalParams = { requestOptions: {} },
): Promise<DogsTest> {
  const result = await _testSend(context, options);
  return _testDeserialize(result);
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
