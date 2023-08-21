var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// util/env-config.ts
import "dotenv/config";
import { z } from "zod";
var envVariables = z.object({
  ALEPH_HOST: z.string()
});
envVariables.parse(process.env);

// util/aleph-fetch.ts
import { parseStringPromise } from "xml2js";
function alephFetch(op, params, explicitArray = false, ignoreErrors = false, method = "GET") {
  return __async(this, null, function* () {
    const url = new URL("X", process.env.ALEPH_HOST);
    params = __spreadValues({
      op,
      library: "rug50"
    }, params);
    let requestBody = null;
    const headers = {};
    if (method === "POST") {
      requestBody = new URLSearchParams(params);
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    } else {
      Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
    }
    const response = yield fetch(url.toString(), { method, body: requestBody, headers });
    const body = yield response.text();
    if (body.includes("Error 403")) {
      throw new Error(`Cannot reach ALEPH_HOST: ${process.env.ALEPH_HOST}`);
    }
    const data = yield parseStringPromise(body, { explicitArray });
    const result = data[op];
    if (!ignoreErrors && result.error) {
      const error = typeof result.error === "string" ? result.error : result.error[0];
      throw new Error(error);
    }
    return result;
  });
}

// actions/borrower-info.ts
function borrowerInfo(borId, hold = true, loans = true) {
  return __async(this, null, function* () {
    const response = yield alephFetch("bor-info", {
      bor_id: borId,
      hold: hold ? "Y" : "N",
      loans: loans ? "Y" : "N",
      cash: "N"
    });
    if (hold) {
      response["item-h"] = convertSingleObjectToArray(response["item-h"]);
    } else {
      response["item-h"] = void 0;
    }
    if (loans) {
      response["item-l"] = convertSingleObjectToArray(response["item-l"]);
    } else {
      response["item-l"] = void 0;
    }
    return response;
  });
}
function convertSingleObjectToArray(objectOrArray) {
  if (!objectOrArray) {
    return [];
  }
  return !Array.isArray(objectOrArray) ? [objectOrArray] : objectOrArray;
}

// actions/find-document.ts
function findDocument(docNumber, base = "rug01") {
  return __async(this, null, function* () {
    return yield alephFetch("find-doc", {
      doc_number: docNumber,
      base
    });
  });
}

// actions/find.ts
function find(request) {
  return __async(this, null, function* () {
    return yield alephFetch("find", {
      base: "rug01",
      request
    });
  });
}

// actions/hold-request-cancel.ts
function holdRequestCancel(item) {
  return __async(this, null, function* () {
    const response = yield alephFetch("hold-req-cancel", {
      doc_number: item.z37["z37-doc-number"],
      item_sequence: item.z37["z37-item-sequence"],
      sequence: item.z37["z37-sequence"]
    });
    return response;
  });
}

// actions/hold-request.ts
function holdRequest(borId, barcode) {
  return __async(this, null, function* () {
    return yield alephFetch("hold-req", {
      bor_id: borId,
      item_barcode: barcode
    });
  });
}

// actions/item-data.ts
function itemData(docNumber) {
  return __async(this, null, function* () {
    return yield alephFetch(
      "item-data",
      {
        base: "rug01",
        doc_number: docNumber
      },
      true
    );
  });
}

// actions/present.ts
function present(setNumber, setEntry) {
  return __async(this, null, function* () {
    return yield alephFetch("present", {
      set_number: setNumber,
      set_entry: setEntry
    });
  });
}

// actions/read-item.ts
function readItem(barcode) {
  return __async(this, null, function* () {
    return yield alephFetch("read-item", { item_barcode: barcode });
  });
}
function readItemByDocument(doc_number, item_sequence) {
  return __async(this, null, function* () {
    return yield alephFetch("read-item", { doc_number, item_sequence });
  });
}

// actions/update-borrower-email.ts
import { toXML } from "jstoxml";
function updateBorrowerEmail(borId, newEmailAddress) {
  return __async(this, null, function* () {
    if (!borId.match(/^PWD\d+$/)) {
      const borInfo = yield borrowerInfo(borId, false, false);
      borId = borInfo.z303["z303-id"];
    }
    const requestData = {
      "p-file-20": {
        "patron-record": {
          z303: {
            "match-id-type": "00",
            "match-id": borId,
            "record-action": "X"
          },
          z304: {
            "record-action": "U",
            "z304-email-address": newEmailAddress,
            "z304-address-type": "01"
          }
        }
      }
    };
    const params = {
      update_flag: "Y",
      xml_full_req: toXML(requestData)
    };
    const result = yield alephFetch("update-bor", params, void 0, true, "POST");
    if (result.error) {
      const error = typeof result.error === "string" ? result.error : result.error[0];
      if (error && error !== `Succeeded to REWRITE table z304. cur-id ${borId}.`) {
        throw new Error(error);
      }
    }
  });
}

// actions/update-item.ts
import { toXML as toXML2 } from "jstoxml";
import { isPlainObject, chunk } from "lodash";
function updateItem(docNumber, itemSequence, ...data) {
  return __async(this, null, function* () {
    let dataset;
    if (data.length === 1 && isPlainObject(data[0])) {
      dataset = Object.entries(data[0]);
    } else if (data.length % 2 === 0) {
      dataset = chunk(data, 2);
    } else {
      throw new Error("Data argument is invalid. Should be either an object or an even number of arguments.");
    }
    const updateItemRequest = {
      "update-item": {
        z30: {
          "z30-doc-number": docNumber,
          "z30-item-sequence": itemSequence
        }
      }
    };
    for (let [key, value] of dataset) {
      updateItemRequest["update-item"]["z30"][key] = value;
    }
    const response = yield alephFetch("update-item", { xml_full_req: toXML2(updateItemRequest) }, false, true);
    if (response.error) {
      const error = typeof response.error !== "string" ? response.error[0] : response.error;
      if (error !== "Item has been updated successfully") {
        throw new Error(error);
      }
    }
    return response;
  });
}
export {
  borrowerInfo,
  find,
  findDocument,
  holdRequest,
  holdRequestCancel,
  itemData,
  present,
  readItem,
  readItemByDocument,
  updateBorrowerEmail,
  updateItem
};
