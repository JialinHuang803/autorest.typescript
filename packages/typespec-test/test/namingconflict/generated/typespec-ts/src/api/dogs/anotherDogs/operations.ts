// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PetStoreContext as Client } from "../../index.js";
import {
  DogsAnotherDogsTest,
  dogsAnotherDogsTestDeserializer,
  DogsAnotherDogsPet,
  dogsAnotherDogsPetDeserializer,
} from "../../../models/dogs/anotherDogs/models.js";
import {
  DogsAnotherDogsPetOptionalParams,
  DogsAnotherDogsGetTestOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _petSend(
  context: Client,
  options: DogsAnotherDogsPetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/dogs/anotherDogs")
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _petDeserialize(result: PathUncheckedResponse): Promise<DogsAnotherDogsPet> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return dogsAnotherDogsPetDeserializer(result.body);
}

export async function pet(
  context: Client,
  options: DogsAnotherDogsPetOptionalParams = { requestOptions: {} },
): Promise<DogsAnotherDogsPet> {
  const result = await _petSend(context, options);
  return _petDeserialize(result);
}

export function _getTestSend(
  context: Client,
  options: DogsAnotherDogsGetTestOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/dogs/anotherDogs")
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getTestDeserialize(
  result: PathUncheckedResponse,
): Promise<DogsAnotherDogsTest> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return dogsAnotherDogsTestDeserializer(result.body);
}

export async function getTest(
  context: Client,
  options: DogsAnotherDogsGetTestOptionalParams = { requestOptions: {} },
): Promise<DogsAnotherDogsTest> {
  const result = await _getTestSend(context, options);
  return _getTestDeserialize(result);
}
