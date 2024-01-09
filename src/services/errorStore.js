function getType(from, type) {
  return type ? type : from;
}

function getError(from, type, ...rest) {
  // This messages are for testing purpouse. will be changed later
  switch (from) {
    case "insertCampaign":
      return {
        type: getType(from, type),
        error: "invalid value provided",
        msg: "coudn't find element with identifer " + rest[0],
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
        err:
          type === "Duplicate Object" ? "Title already exists" : "id not found",
        msg:
          type === "Duplicate Object"
            ? "Trying to create a duplicate object"
            : "coudn't find document with provided id",
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
        msg: "provided filed must be invalid",
      };

    case "insertByName":
      return {
        type: getType(from, type),
        err: "Name already exists",
        msg: "Trying to create a duplicate object",
      };
  }
}

module.exports = getError;
