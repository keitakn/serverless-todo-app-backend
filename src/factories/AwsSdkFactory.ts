import * as AWS from "aws-sdk";
import {DynamoDB} from "aws-sdk";
import DocumentClient = DynamoDB.DocumentClient;
import Environment from "../infrastructures/Environment";

/**
 * AwsSdkFactory
 *
 * @author keita-nishimoto
 * @since 2017-07-02
 */
export default class AwsSdkFactory {

  /**
   * DynamoDB.DocumentClientを生成する
   *
   * @returns {DynamoDB.DocumentClient|DocumentClient}
   */
  public static createDynamoDbDocumentClient(): DocumentClient {
    if (Environment.isLocal() === true) {
      const documentClientOptions = {
        region: "localhost",
        endpoint: "http://localhost:8000",
      };

      return new AWS.DynamoDB.DocumentClient(documentClientOptions);
    }

    return new AWS.DynamoDB.DocumentClient();
  }
}
