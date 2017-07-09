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
  it("testSuccess", () => {
    return (async () => {
      const response = await TodoTest.ApiClient.findTodoList();
      assert.equal(response.status, 200, "ステータスコードのチェック");
    })().catch((error) => {
      assert.fail(error.response.data);
    });
  });
});
