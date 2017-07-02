import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import InternalServerError from "../errors/InternalServerError";
import {Logger} from "../infrastructures/Logger";

/**
 * Repository
 *
 * @author keita-nishimoto
 * @since 2017-07-02
 */
export default class TodoRepository {

  /**
   * @param dynamoDbDocumentClient
   */
  constructor(private dynamoDbDocumentClient: DocumentClient) {
  }

  /**
   * TODOを作成する
   *
   * @param createParams
   * @returns {Promise<TodoResponse.CreateResponse>}
   */
  public async create(createParams: TodoResponse.CreateResponse): Promise<TodoResponse.CreateResponse> {
    try {
      const params = {
        TableName: this.getTableName(),
        Item: createParams,
      };

      await this.dynamoDbDocumentClient.put(params).promise();

      return createParams;
    } catch (error) {
      Logger.critical(error);
      return Promise.reject(
        new InternalServerError(error.message),
      );
    }
  }

  /**
   * 実行環境のテーブル名を取得する
   *
   * @returns {string}
   */
  private getTableName(): string {
    const tableName = process.env.TODOS_TABLE_NAME;

    return typeof tableName === "string" ? tableName : "";
  }
}

