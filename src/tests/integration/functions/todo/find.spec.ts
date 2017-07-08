import * as assert from "power-assert";
import {TodoTest} from "../../../lib/TodoTest";
import {TodoResponse} from "../../../../domain/TodoResponse";

/**
 * TODO取得APIのテスト
 */
describe("findTodoTest", () => {

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
      const response = await TodoTest.ApiClient.findTodo(todoCreateResponse.id);
      assert.equal(response.status, 200, "ステータスコードのチェック");
      assert.equal(response.data.id, todoCreateResponse.id, "IDの型チェック");
      assert.equal(response.data.title, todoCreateResponse.title, "タイトルのチェック");
      assert.equal(response.data.isCompleted, todoCreateResponse.isCompleted, "isCompletedがfalseである事をチェック");
      assert.equal(response.data.createdAt, todoCreateResponse.createdAt, "createdAtの存在チェック");
      assert.equal(response.data.updatedAt, todoCreateResponse.updatedAt, "updatedAtの存在チェック");
    })().catch((error) => {
      assert.fail(error.response.data);
    });
  });

  /**
   * 異常系テストケース
   *
   * 指定したTODOが存在しない
   */
  it("testFailDoesNotExists", () => {
    return (async () => {
      const response = await TodoTest.ApiClient.findTodo("2443f38f-8a69-4525-b2d1-d5da482764d1");
      assert.fail(response.data);
    })().catch((error) => {
      assert.equal(error.response.status, 404, "ステータスコードのチェック");
      assert.equal(error.response.data.code, 404, "エラーコードのチェック");
      assert.equal(error.response.data.message, "Not Found", "エラーメッセージのチェック");
    });
  });

  /**
   * 異常系テストケース
   *
   * バリデーションエラー
   */
  it("testFailValidation", () => {
    return (async () => {
      const response = await TodoTest.ApiClient.findTodo("abc");
      assert.fail(response.data);
    })().catch((error) => {
      assert.equal(error.response.status, 422, "ステータスコードのチェック");
      assert.equal(error.response.data.code, 422, "エラーコードのチェック");
      assert.equal(error.response.data.message, "Unprocessable Entity", "エラーメッセージのチェック");
      assert.ok(error.response.data.errors.id, "idがerrorに含まれている事をチェック");
    });
  });
});
