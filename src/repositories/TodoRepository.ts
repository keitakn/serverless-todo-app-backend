import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import InternalServerError from "../errors/InternalServerError";
import {Logger} from "../infrastructures/Logger";
import GetItemOutput = DocumentClient.GetItemOutput;
import {TodoRequest} from "../domain/TodoRequest";
import {TodoResponse} from "../domain/TodoResponse";
import NotFoundError from "../errors/NotFoundError";
import UpdateParams = TodoRequest.UpdateParams;
import UpdateResponse = TodoResponse.UpdateResponse;

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
   * TODOを1件取得する
   *
   * @param id
   * @returns {Promise<TodoResponse.FindResponse>}
   */
  public find(id: string): Promise<TodoResponse.FindResponse> {
    return new Promise<TodoResponse.FindResponse>((resolve, reject) => {
      const params = {
        TableName: this.getTableName(),
        Key: {
          id,
        },
      };

      this.dynamoDbDocumentClient
        .get(params)
        .promise()
        .then((getItemOutput: GetItemOutput) => {

          if (getItemOutput.Item == null) {
            return reject(new NotFoundError());
          }

          const findResponse: TodoResponse.FindResponse = {
            id: getItemOutput.Item["id"],
            title: getItemOutput.Item["title"],
            isCompleted: getItemOutput.Item["isCompleted"],
            createdAt: getItemOutput.Item["createdAt"],
            updatedAt: getItemOutput.Item["updatedAt"],
          };

          return resolve(findResponse);
        })
        .catch((error) => {
          Logger.critical(error);
          return reject(
            new InternalServerError(error.message),
          );
        });
    });
  }

  /**
   * TODOリストを取得する
   *
   * @returns {Promise<TodoResponse.FindListResponse>}
   */
  public findList(request: TodoRequest.FindListRequest): Promise<TodoResponse.FindListResponse> {
    return new Promise<TodoResponse.FindListResponse>((resolve, reject) => {
      const params = {
        TableName: this.getTableName(),
        Limit: request.limit,
      };

      // scan() はパフォーマンス、コストの点から出来る限り利用すべきではない（本件はサンプルプロジェクトなので使っている）
      // 実開発では出来る限り query() で解決出来るようなデータ構造を設計するべき
      this.dynamoDbDocumentClient
        .scan(params)
        .promise()
        .then((scanOutput) => {
          if (scanOutput.Items == null || scanOutput.Count == null) {
            return reject(new NotFoundError());
          }

          const todoItems = scanOutput.Items.map((todo) => {
            const findResponse: TodoResponse.FindResponse = {
              id: todo["id"],
              title: todo["title"],
              isCompleted: todo["isCompleted"],
              createdAt: todo["createdAt"],
              updatedAt: todo["updatedAt"],
            };

            return findResponse;
          });

          const todoListResponse: TodoResponse.FindListResponse = {
            items: todoItems,
            count: scanOutput.Count,
          };

          return resolve(todoListResponse);
        })
        .catch((error) => {
          Logger.critical(error);
          return reject(
            new InternalServerError(error.message),
          );
        });
    });
  }

  /**
   * TODOを変更する
   *
   * @param {TodoRequest.UpdateParams} updateParams
   * @returns {Promise<TodoResponse.UpdateResponse>}
   */
  public async update(updateParams: UpdateParams): Promise<UpdateResponse> {
    try {
      const params = {
        TableName: this.getTableName(),
        Item: updateParams,
      };

      await this.dynamoDbDocumentClient.put(params).promise();

      return updateParams;
    } catch (error) {
      Logger.critical(error);
      return Promise.reject(
        new InternalServerError(error.message),
      );
    }
  }

  /**
   * TODOを削除する
   *
   * @param {string} id
   * @returns {Promise<void>}
   */
  public async deleteTodo(id: string): Promise<void> {
    try {
      const params = {
        TableName: this.getTableName(),
        Key: {
          id,
        },
      };

      await this.dynamoDbDocumentClient.delete(params).promise();
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

