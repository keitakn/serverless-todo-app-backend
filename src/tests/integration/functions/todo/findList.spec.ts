import * as assert from "power-assert";
import {TodoTest} from "../../../lib/TodoTest";

/**
 * TODOリスト取得APIのテスト
 */
describe("findTodoListTest", () => {

  /**
   * 事前にTODOを登録しておく
   */
  beforeEach(() => {
    return (async () => {
      const request = {
        title: "猫にご飯をあげる。",
      };

      await TodoTest.ApiClient.createTodo(request);

    })().catch((error) => {
      assert.fail(error.response.data);
    });
  });

  /**
   * 正常系テストケース
   * Queryパラメータを指定する
   */
  it("testSuccessSetQueryParams", () => {
    return (async () => {
      const request = {
        limit: 1,
      };

      const response = await TodoTest.ApiClient.findTodoList(request);
      assert.equal(response.status, 200, "ステータスコードのチェック");
      assert.equal(response.data.count, 1, "件数のチェック");
      assert.ok(response.data.items, "itemsが設定されている事をチェック");
    })().catch((error) => {
      assert.fail(error.response.data);
    });
  });

  /**
   * 正常系テストケース
   * Queryパラメータを指定しない
   */
  it("testSuccessNoSetQueryParams", () => {
    return (async () => {
      const response = await TodoTest.ApiClient.findTodoList();
      assert.equal(response.status, 200, "ステータスコードのチェック");
      assert.ok(response.data.count, "countが設定されている事をチェック");
      assert.ok(response.data.items, "itemsが設定されている事をチェック");
    })().catch((error) => {
      assert.fail(error.response.data);
    });
  });

  /**
   * 異常系テストケース
   *
   * バリデーションエラー
   */
  it("testFailValidation", () => {
    return (async () => {
      const request = {
        limit: 9999,
      };

      const response = await TodoTest.ApiClient.findTodoList(request);
      assert.fail(response.data);
    })().catch((error) => {
      assert.equal(error.response.status, 422, "ステータスコードのチェック");
      assert.equal(error.response.data.code, 422, "エラーコードのチェック");
      assert.equal(error.response.data.message, "Unprocessable Entity", "エラーメッセージのチェック");
      assert.ok(error.response.data.errors.limit, "limitがerrorに含まれている事をチェック");
    });
  });
});
