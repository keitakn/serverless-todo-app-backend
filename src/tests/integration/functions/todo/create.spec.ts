import * as assert from "power-assert";
import {TodoTest} from "../../../lib/TodoTest";

/**
 * TODO作成のテスト
 */
describe("createTodoTest", () => {

  /**
   * 正常系テストケース
   */
  it("testSuccess", () => {
    return (async () => {
      const request = {
        title: "買い物に行く。",
      };
      const response = await TodoTest.ApiClient.createTodo(request);
      assert.equal(response.status, 201, "ステータスコードのチェック");
    })();
  });
});
