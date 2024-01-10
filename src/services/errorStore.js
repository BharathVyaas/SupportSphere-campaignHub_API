// status codes from chatGpt
function getError({ source, error, ...rest }) {
  // These messages are for testing purposes and will be changed later
  switch (source) {
    // ToDo check Internal Server Errors again i'm putting them just as placeHolder
    // ToDo check status Codes they could be wrong.
    case "getDocument:recordId":
      return {
        source: "getDocument:recordId",
        client: {
          status: 400,
          error: "Invalid Id",
          message: "Internal Server Error",
        },
        dev: {
          type: "InvalidIdError",
          error: "Must provide a valid recordId",
          message: `Couldn't find a record with _id ${recordId}`,
          statusCode: 400,
          timeStamp: new Date().toISOString(),
          data: { rest },
          stack: new Error().stack,
        },
      };
    case "getDocument:creatdBy":
      return {
        source: "getDocument:creatdBy",
        client: {
          status: 400,
          error: "Invalid Id",
          message: "Internal Server Error",
        },
        dev: {
          type: "InvalidIdError",
          error: "Must provide a valid createdBy name",
          message: `Couldn't find a record with createdBy`,
          statusCode: 400,
          timeStamp: new Date().toISOString(),
          data: { rest },
          stack: new Error().stack,
        },
      };
    case "getDocument:caughtError":
      return {
        source: "getDocument:caughtError",
        client: {
          statusCode: 500,
          error: "Internal Server Error",
          message: "Unexpected error occurred while processing the request.",
        },
        dev: {
          type: "FetchingError",
          error: error,
          message: "Failed to fetch record with createdBy or recordId",
          statusCode: 500,
          timeStamp: new Date().toISOString(),
          data: { rest },
          stack: new Error().stack,
        },
      };
    case "insertByName:doesTitleExist":
      return {
        source: "insertByName:doesTitleExist",
        client: {
          statusCode: 409,
          error: "Creating duplicate title",
          message: "A Campaign with same name already exists",
        },
        dev: {
          type: "DuplicateData",
          error: "Creating duplicate campaign title",
          message: "A Campaign with same name already exists",
          statusCode: 409,
          timeStamp: new Date().toISOString(),
          data: { rest },
          stack: new Error().stack,
        },
      };
    case "insertByName:caughtError":
      return {
        source: "insertByName:caughtError",
        client: {
          statusCode: 422,
          error: "Unprocessable Entity",
          message: "Unexpected error occurred while processing the request.",
        },
        dev: {
          type: "InsertionError",
          error: error,
          message:
            "Failed to create new campaign with provided parameters {createdBy, campaign}",
          statusCode: 422,
          timeStamp: new Date().toISOString(),
          data: { rest },
          stack: new Error().stack,
        },
      };
    case "insertCampaign:insertByName":
      return {
        source: "insertCampaign:insertByName",
        client: {
          statusCode: 422,
          error: "Unprocessable Entity",
          message: "Unexpected error occurred while processing the request.",
        },
        dev: {
          type: "InsertionError",
          error: "Cannot Find or Insert",
          message:
            "Cannot find document with provided recordId and Cannot insert campaign with provided data {createdBy, campaign}.",
          statusCode: 422,
          timeStamp: new Date().toISOString(),
          data: { rest },
          stack: new Error().stack,
        },
      };
    case "insertById:caughtError":
      return {
        source: "insertById:caughtError",
        client: {
          statusCode: 422,
          error: "Unprocessable Entity",
          message: "Unexpected error occurred while processing the request.",
        },
        dev: {
          type: "InsertionError",
          error: error,
          message:
            "Failed to create new campaign with provided parameters {recordId, campaign}",
          statusCode: 422,
          timeStamp: new Date().toISOString(),
          data: { rest },
          stack: new Error().stack,
        },
      };
    case "insertById:campaignDocument":
      return {
        source: "insertById:campaignDocument",
        client: {
          statusCode: 422,
          error: "Unprocessable Entity",
          message: "Unexpected error occurred while processing the request.",
        },
        dev: {
          type: "InsertionError",
          error: "Cannot fetch document",
          message: "Cannot find document with provided recordId",
          statusCode: 422,
          timeStamp: new Date().toISOString(),
          data: { rest },
          stack: new Error().stack,
        },
      };
    case "insertById:doesTitleExist":
      return {
        source: "insertById:doesTitleExist",
        client: {
          statusCode: 409,
          error: "Creating duplicate title",
          message: "A Campaign with same name already exists",
        },
        dev: {
          type: "DuplicateData",
          error: "Creating duplicate campaign title",
          message: "A Campaign with same id already exists",
          statusCode: 409,
          timeStamp: new Date().toISOString(),
          data: { rest },
          stack: new Error().stack,
        },
      };
    case "createCampaign:creatdBy":
      return {
        source: "createCampaign:creatdBy",
        client: {
          status: 400,
          error: "Invalid Id",
          message: "Internal Server Error",
        },
        dev: {
          type: "InvalidIdError",
          error: "Identifier value is Undefined",
          message: `Must provide value for createdBy to create a campaign`,
          statusCode: 400,
          timeStamp: new Date().toISOString(),
          data: { rest },
          stack: new Error().stack,
        },
      };
    case "createCampaign:caughtError":
      return {
        source: "createCampaign:caughtError",
        client: {
          statusCode: 500,
          error: "Internal Server Error",
          message: "Unexpected error occurred while processing the request.",
        },
        dev: {
          type: "FetchingError",
          error: error,
          message:
            "Failed to create a campign with provided perameter createdBy",
          statusCode: 500,
          timeStamp: new Date().toISOString(),
          data: { rest },
          stack: new Error().stack,
        },
      };
    case "getCampaignDocument:caughtError":
      return {
        source: "getCampaignDocument:caughtError",
        client: {
          statusCode: 500,
          error: "Internal Server Error",
          message: "Unexpected error occurred while processing the request.",
        },
        dev: {
          type: "FetchingError",
          error: error,
          message: "Failed to fetch record document",
          statusCode: 500,
          timeStamp: new Date().toISOString(),
          data: { rest },
          stack: new Error().stack,
        },
      };
    case "updateByRecordId:caughtError":
      return {
        source: "updateByRecordId:caughtError",
        client: {
          statusCode: 500,
          error: "Internal Server Error",
          message: "Unexpected error occurred while processing the request.",
        },
        dev: {
          type: "InsertionError",
          error: error,
          message: "Failed to Update campaign with provided details.",
          statusCode: 500,
          timeStamp: new Date().toISOString(),
          data: { rest },
          stack: new Error().stack,
        },
      };
    case "updateCampaign:campaignId":
      return {
        source: "updateCampaign:campaignId",
        client: {
          statusCode: 422,
          error: "Unprocessable Entity",
          message: "Unexpected error occurred while processing the request.",
        },
        dev: {
          type: "InsertionError",
          error: "Required value is Undefined",
          message: "Must Provide recordId && campaignId to update a record.",
          statusCode: 422,
          timeStamp: new Date().toISOString(),
          data: { rest },
          stack: new Error().stack,
        },
      };
    case "deleteDocument:caughtError":
      return {
        source: "deleteDocument:caughtError",
        client: {
          statusCode: 422,
          error: "Unprocessable Entity",
          message: "Unexpected error occurred while processing the request.",
        },
        dev: {
          type: "DeletionError",
          error: error,
          message:
            "Failed to delete campaign with provided parameter createdBy",
          statusCode: 422,
          timeStamp: new Date().toISOString(),
          data: { rest },
          stack: new Error().stack,
        },
      };
    case "deleteCampaignById:caughtError":
      return {
        source: "deleteCampaignById:caughtError",
        client: {
          statusCode: 422,
          error: "Unprocessable Entity",
          message: "Unexpected error occurred while processing the request.",
        },
        dev: {
          type: "DeletionError",
          error: error,
          message:
            "Failed to delete campaign with provided parameters {recordId, campaignId}",
          statusCode: 422,
          timeStamp: new Date().toISOString(),
          data: { rest },
          stack: new Error().stack,
        },
      };
    case "deleteCampaign:campaignId":
      return {
        source: "deleteCampaign:campaignId",
        client: {
          statusCode: 422,
          error: "Unprocessable Entity",
          message: "Unexpected error occurred while processing the request.",
        },
        dev: {
          type: "DeletionError",
          error: error,
          message: `Must provide [createdBy to delete documnet] or [(recordId and campaignId) to delete a campaign] one of this values is missing.`,
          statusCode: 422,
          timeStamp: new Date().toISOString(),
          data: { rest },
          stack: new Error().stack,
        },
      };
    default:
      return { source: "", client: {}, dev: {} };
  }
}

module.exports = getError;
