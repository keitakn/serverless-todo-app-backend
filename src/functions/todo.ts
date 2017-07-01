import * as lambda from "aws-lambda";
import * as sourceMapSupport from "source-map-support";
import * as uuidV4 from "uuid/v4";
import ErrorResponse from "../domain/ErrorResponse";
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

    const response = {
      statusCode: 201,
      body: JSON.stringify(createResponse),
      headers: {"Access-Control-Allow-Origin": "*"},
    };

    callback(undefined, response);
  } catch (error) {
    const errorResponse = new ErrorResponse(error);
    const response = errorResponse.getResponse();

    callback(undefined, response);
  }
};
