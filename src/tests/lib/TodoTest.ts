import axios, { AxiosResponse } from 'axios';
import { TestUtil } from './TestUtil';
import { TodoRequest } from '../../domain/TodoRequest';

/**
 * TodoTest
 *
 * @author keita-nishimoto
 * @since 2017-06-19
 */
export namespace TodoTest {

  /**
   * CreateTodoのリクエスト型
   */
  export interface CreateTodoRequest {
    title: string;
  }

  /**
   * ApiClient
   *
   * @author keita-nishimoto
   * @since 2017-06-19
   */
  export class ApiClient {

    /**
     * TODOを作成する
     *
     * @param request
     * @returns {Promise<AxiosResponse>}
     */
    public static createTodo(request: CreateTodoRequest): Promise<AxiosResponse> {
      return new Promise<AxiosResponse>((resolve, reject) => {
        const headers = {
          'Content-type': 'application/json',
        };

        const baseUri = TestUtil.getTodoAppBackendUri();
        const requestUri = `${baseUri}/todo`;

        const requestConfig = {
          headers,
        };

        axios.post(
          requestUri,
          request,
          requestConfig,
        ).then((response: AxiosResponse) => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      });
    }

    /**
     * TODOを変更する
     *
     * @param {TodoRequest.UpdateRequest} request
     * @returns {Promise<AxiosResponse>}
     */
    public static updateTodo(request: TodoRequest.UpdateRequest) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        const headers = {
          'Content-type': 'application/json',
        };

        const baseUri = TestUtil.getTodoAppBackendUri();
        const requestUri = `${baseUri}/todo/${request.id}`;

        const requestConfig = {
          headers,
        };

        const apiRequest = {
          title: request.title,
          isCompleted: request.isCompleted,
        };

        axios.put(
          requestUri,
          apiRequest,
          requestConfig,
        ).then((response: AxiosResponse) => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      });
    }

    /**
     * TODOを1件取得する
     *
     * @param id
     * @returns {Promise<AxiosResponse>}
     */
    public static findTodo(id: string): Promise<AxiosResponse> {
      return new Promise<AxiosResponse>((resolve, reject) => {
        const headers = {
          'Content-type': 'application/json',
        };

        const baseUri = TestUtil.getTodoAppBackendUri();
        const requestUri = `${baseUri}/todo/${id}`;

        const requestConfig = {
          headers,
        };

        axios.get(
          requestUri,
          requestConfig,
        ).then((response: AxiosResponse) => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      });
    }

    /**
     * TODOを全件取得する
     *
     * @returns {Promise<AxiosResponse>}
     */
    public static findTodoList(request?: TodoRequest.FindListRequest): Promise<AxiosResponse> {
      return new Promise<AxiosResponse>((resolve, reject) => {
        const headers = {
          'Content-type': 'application/json',
        };

        const baseUri = TestUtil.getTodoAppBackendUri();
        let requestUri = `${baseUri}/todo`;

        if (request != null && 'limit' in request) {
          requestUri = requestUri + `?limit=${request.limit}`;
        }

        const requestConfig = {
          headers,
        };

        axios.get(
          requestUri,
          requestConfig,
        ).then((response: AxiosResponse) => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      });
    }

    /**
     * TODOを削除する
     *
     * @param {string} id
     * @returns {Promise<AxiosResponse>}
     */
    public static deleteTodo(id: string) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        const headers = {
          'Content-type': 'application/json',
        };

        const baseUri = TestUtil.getTodoAppBackendUri();
        const requestUri = `${baseUri}/todo/${id}`;

        const requestConfig = {
          headers,
        };

        axios.delete(
          requestUri,
          requestConfig,
        ).then((response: AxiosResponse) => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      });
    }
  }
}
