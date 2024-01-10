function getType(from, type) {
  return type ? type : from;
}

function getError(from, type, ...rest) {
  // These messages are for testing purposes and will be changed later
  switch (from) {
    case "insertCampaign":
      return {
        type: getType(from, type),
        error: "invalid value provided",
        msg: "couldn't find element with identifier " + rest[0],
      };
    case "getCampaign":
      return {
        type: getType(from, type),
        error: "identifier is empty",
        msg: "must pass id or createdBy",
      };
    case "insertById":
      return {
        type: getType(from, type),
        error:
          type === "Duplicate Object" ? "Title already exists" : "id not found",
        msg:
          type === "Duplicate Object"
            ? "Trying to create a duplicate object"
            : "couldn't find document with provided id",
      };
    case "createCampaign":
      return {
        type: getType(from, type),
        error: "invalid field",
        msg: "createdBy value is empty",
      };
    case "getCampaign":
      return {
        type: getType(from, type),
        error: "invalid field",
        msg: "provided field must be invalid",
      };
    case "insertByName":
      return {
        type: getType(from, type),
        error: "Name already exists",
        msg: "Trying to create a duplicate object",
      };
    case "updateByRecordId":
      return {
        type: getType(from, type),
        err: "Internal Server Error",
        msg: "Error updating campaign document",
      };
    case "updateCampaign":
      return {
        type: getType(from, type),
        error: "Not Enough Data",
        msg: "required both recordId and campaignId to update a campaign",
      };
    case "deleteCampaignById":
      return {
        type: getType(from, type),
        error: "invalid value provided",
        msg: "couldn't find element with identifier " + rest[0],
      };
  }
}

module.exports = getError;
