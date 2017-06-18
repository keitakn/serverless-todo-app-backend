import {AxiosResponse} from "axios";
import axios from "axios";
import {TestUtil} from "./TestUtil";

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

          console.error(error);

          reject(error);
        });
      });
    }
  }
}
