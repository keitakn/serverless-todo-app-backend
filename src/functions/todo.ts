import * as lambda from "aws-lambda";
import * as sourceMapSupport from "source-map-support";
import * as uuidV4 from "uuid/v4";
import ErrorResponse from "../domain/ErrorResponse";
import SuccessResponse from "../domain/SuccessResponse";
import TodoValidationService from "../domain/TodoValidationService";
import ValidationErrorResponse from "../domain/ValidationErrorResponse";
import AwsSdkFactory from "../factories/AwsSdkFactory";
import RequestFactory from "../factories/RequestFactory";
import TodoRepository from "../repositories/TodoRepository";

sourceMapSupport.install();

const dynamoDbDocumentClient = AwsSdkFactory.createDynamoDbDocumentClient();

/**
 * TODOを追加する
 *
 * @param event
 * @param context
 * @param callback
 * @returns {Promise<void>}
 */
export const create: lambda.ProxyHandler = async (
  event: lambda.APIGatewayEvent,
  context: lambda.Context,
  callback: lambda.Callback,
): Promise<void> => {
  try {
    const requestObject: TodoRequest.CreateRequest = new RequestFactory(event).create();

    const validateResultObject = TodoValidationService.createValidate(requestObject);
    if (Object.keys(validateResultObject).length !== 0) {
      const validationErrorResponse = new ValidationErrorResponse(validateResultObject);
      callback(undefined, validationErrorResponse.getResponse());
      return;
    }

    const nowDateTime = new Date().getTime();

    const createParams = {
      id: uuidV4(),
      title: requestObject.title,
      isCompleted: false,
      createdAt: nowDateTime,
      updatedAt: nowDateTime,
    };

    const todoRepository = new TodoRepository(dynamoDbDocumentClient);
    const createResponse = await todoRepository.create(createParams);

    const successResponse = new SuccessResponse(createResponse, 201);

    callback(undefined, successResponse.getResponse());
  } catch (error) {
    const errorResponse = new ErrorResponse(error);
    const response = errorResponse.getResponse();

    callback(undefined, response);
  }
};

/**
 * TODOを1件取得する
 *
 * @param event
 * @param context
 * @param callback
 * @returns {Promise<void>}
 */
export const find: lambda.ProxyHandler = async (
  event: lambda.APIGatewayEvent,
  context: lambda.Context,
  callback: lambda.Callback,
): Promise<void> => {
  try {
    const requestObject =  extractRequest(event);

    const validateResultObject = TodoValidationService.findValidate(requestObject);
    if (Object.keys(validateResultObject).length !== 0) {
      const validationErrorResponse = new ValidationErrorResponse(validateResultObject);
      callback(undefined, validationErrorResponse.getResponse());
      return;
    }

    const todoRepository = new TodoRepository(dynamoDbDocumentClient);
    const findResponse = await todoRepository.find(requestObject.id);

    const successResponse = new SuccessResponse(findResponse, 200);

    callback(undefined, successResponse.getResponse());
  } catch (error) {
    const errorResponse = new ErrorResponse(error);
    const response = errorResponse.getResponse();

    callback(undefined, response);
  }
};

/**
 * TODOリストを取得する
 *
 * @param event
 * @param context
 * @param callback
 * @returns {Promise<void>}
 */
export const findList: lambda.ProxyHandler = async (
  event: lambda.APIGatewayEvent,
  context: lambda.Context,
  callback: lambda.Callback,
): Promise<void> => {
  try {
    const todoRepository = new TodoRepository(dynamoDbDocumentClient);
    const findListResponse = await todoRepository.findList();

    const successResponse = new SuccessResponse(findListResponse, 200);

    callback(undefined, successResponse.getResponse());
  } catch (error) {
    const errorResponse = new ErrorResponse(error);
    const response = errorResponse.getResponse();

    callback(undefined, response);
  }
};

/**
 * APIGatewayEventからリクエストパラメータを取り出す
 *
 * @param event
 * @returns {{client_id: number}}
 */
const extractRequest = (event: lambda.APIGatewayEvent): TodoRequest.FindRequest => {
  if (event.pathParameters != null) {
    return {
      id: event.pathParameters.id,
    };
  }

  return {
    id: "",
  };
};
