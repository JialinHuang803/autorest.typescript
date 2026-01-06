// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PetStoreContext as Client } from "../index.js";
import { CatsPet, catsPetDeserializer } from "../../models/cats/models.js";
import { CatsPetOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _petSend(
  context: Client,
  options: CatsPetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/cats")
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _petDeserialize(result: PathUncheckedResponse): Promise<CatsPet> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return catsPetDeserializer(result.body);
}

export async function pet(
  context: Client,
  options: CatsPetOptionalParams = { requestOptions: {} },
): Promise<CatsPet> {
  const result = await _petSend(context, options);
  return _petDeserialize(result);
}
