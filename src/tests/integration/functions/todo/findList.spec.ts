import * as assert from "power-assert";
import {TodoTest} from "../../../lib/TodoTest";
import {TodoResponse} from "../../../../domain/TodoResponse";

/**
 * TODOリスト取得APIのテスト
 */
describe("findTodoListTest", () => {

  /**
   * テストに利用するTODOオブジェクト
   */
  let todoCreateResponse: TodoResponse.CreateResponse;

  /**
   * 事前にTODOを登録しておく
   */
  beforeEach(() => {
    return (async () => {
      const request = {
        title: "猫にご飯をあげる。",
      };

      const response = await TodoTest.ApiClient.createTodo(request);

      todoCreateResponse = {
        id: response.data.id,
        title: response.data.title,
        isCompleted: response.data.isCompleted,
        createdAt: response.data.createdAt,
        updatedAt: response.data.updatedAt,
      };

    })().catch((error) => {
      assert.fail(error.response.data);
    });
  });

  /**
   * 正常系テストケース
   */
  it("testSuccessSetQueryParams", () => {
    return (async () => {
      const request = {
        limit: 1,
      };

      const response = await TodoTest.ApiClient.findTodoList(request);
      assert.equal(response.status, 200, "ステータスコードのチェック");
      assert.equal(response.data.count, 1, "件数のチェック");
    })().catch((error) => {
      assert.fail(error.response.data);
    });
  });
});
