import {AxiosResponse} from "axios";
import axios from "axios";
import {TestUtil} from "./TestUtil";
import {TodoRequest} from "../../domain/TodoRequest";

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
          "Content-type": "application/json",
        };

        const baseUri = TestUtil.createTodoApiUri();
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
     * TODOを1件取得する
     *
     * @param id
     * @returns {Promise<AxiosResponse>}
     */
    public static findTodo(id: string): Promise<AxiosResponse> {
      return new Promise<AxiosResponse>((resolve, reject) => {
        const headers = {
          "Content-type": "application/json",
        };

        const baseUri = TestUtil.createTodoApiUri();
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
          "Content-type": "application/json",
        };

        const baseUri = TestUtil.createTodoApiUri();
        let requestUri = `${baseUri}/todo`;

        if (request != null && "limit" in request) {
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
  }
}
