import * as lambda from "aws-lambda";
import * as sourceMapSupport from "source-map-support";
import * as uuidV4 from "uuid/v4";
import ErrorResponse from "../domain/ErrorResponse";
import SuccessResponse from "../domain/SuccessResponse";
import {TodoRequest} from "../domain/TodoRequest";
import TodoValidationService from "../domain/TodoValidationService";
import ValidationErrorResponse from "../domain/ValidationErrorResponse";
import AwsSdkFactory from "../factories/AwsSdkFactory";
import RequestFactory from "../factories/RequestFactory";
import TodoRepository from "../repositories/TodoRepository";
import UpdateParams = TodoRequest.UpdateParams;

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
    const requestObject = extractQueryStringParams(event);

    const validateResultObject = TodoValidationService.findListValidate(requestObject);
    if (Object.keys(validateResultObject).length !== 0) {
      const validationErrorResponse = new ValidationErrorResponse(validateResultObject);
      callback(undefined, validationErrorResponse.getResponse());
      return;
    }

    const todoRepository = new TodoRepository(dynamoDbDocumentClient);
    const findListResponse = await todoRepository.findList(requestObject);

    const successResponse = new SuccessResponse(findListResponse, 200);

    callback(undefined, successResponse.getResponse());
  } catch (error) {
    const errorResponse = new ErrorResponse(error);
    const response = errorResponse.getResponse();

    callback(undefined, response);
  }
};

/**
 * TODOを変更する
 *
 * @param {APIGatewayEvent} event
 * @param {Context} context
 * @param {Callback} callback
 * @returns {Promise<void>}
 */
export const update: lambda.ProxyHandler = async (
  event: lambda.APIGatewayEvent,
  context: lambda.Context,
  callback: lambda.Callback,
): Promise<void> => {
  try {
    const requestObject: TodoRequest.UpdateRequest = createUpdateRequest(event);

    const validateResultObject = TodoValidationService.updateValidate(requestObject);
    if (Object.keys(validateResultObject).length !== 0) {
      const validationErrorResponse = new ValidationErrorResponse(validateResultObject);
      callback(undefined, validationErrorResponse.getResponse());
      return;
    }

    const todoRepository = new TodoRepository(dynamoDbDocumentClient);

    await todoRepository.find(requestObject.id);

    const nowDateTime = new Date().getTime();

    const updateParams: UpdateParams = {
      id: requestObject.id,
      title: requestObject.title,
      isCompleted: requestObject.isCompleted,
      updatedAt: nowDateTime,
    };

    const updateResponse = await todoRepository.update(updateParams);

    const successResponse = new SuccessResponse(updateResponse, 200);

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

/**
 * APIGatewayEventからQueryパラメータを取り出す
 *
 * @param event
 * @returns {{limit: number}}
 */
const extractQueryStringParams = (event: lambda.APIGatewayEvent): TodoRequest.FindListRequest => {
  const defaultParams = {
    limit: 10,
  };

  if (event.queryStringParameters == null) {
    return defaultParams;
  }

  if (event.queryStringParameters.limit == null) {
    return defaultParams;
  }

  return {limit: parseInt(event.queryStringParameters.limit, 10)};
};

/**
 * APIGatewayEventからupdate用のパラメータを生成する
 *
 * @param {APIGatewayEvent} event
 * @returns {TodoRequest.UpdateRequest}
 */
const createUpdateRequest = (event: lambda.APIGatewayEvent): TodoRequest.UpdateRequest => {
  const requestBody: TodoRequest.UpdateRequest = new RequestFactory(event).create();
  const requestParams = extractRequest(event);

  return {
    id: requestParams.id,
    title: requestBody.title,
    isCompleted: requestBody.isCompleted,
  };
};
