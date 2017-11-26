import * as assert from 'power-assert';
import { TodoTest } from '../../../lib/TodoTest';
import { TodoResponse } from '../../../../domain/TodoResponse';

/**
 * TODO変更APIのテスト
 */
describe('updateTodoTest', () => {

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
        title: '猫にご飯をあげる。',
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
  it('testSuccess', () => {
    return (async () => {
      const todoUpdateRequest = {
        id: todoCreateResponse.id,
        title: 'にゃんこの写真を撮る',
        isCompleted: true,
      };

      const response = await TodoTest.ApiClient.updateTodo(todoUpdateRequest);
      assert.equal(response.status, 200, 'ステータスコードのチェック');
      assert.equal(response.data.id, todoUpdateRequest.id, 'IDの型チェック');
      assert.equal(response.data.title, todoUpdateRequest.title, 'タイトルのチェック');
      assert.equal(response.data.isCompleted, todoUpdateRequest.isCompleted, 'isCompletedがtrueである事をチェック');
    })().catch((error) => {
      assert.fail(error.response.data);
    });
  });

  /**
   * 異常系テストケース
   *
   * 指定したTODOが存在しない
   */
  it('testFailDoesNotExists', () => {
    return (async () => {
      const todoUpdateRequest = {
        id: '999999999999999999aaaaaaaaaaaaaaaaaa',
        title: 'にゃんこの写真を撮る',
        isCompleted: true,
      };

      const response = await TodoTest.ApiClient.updateTodo(todoUpdateRequest);
      assert.fail(response.data);
    })().catch((error) => {
      assert.equal(error.response.status, 404, 'ステータスコードのチェック');
      assert.equal(error.response.data.code, 404, 'エラーコードのチェック');
      assert.equal(error.response.data.message, 'Not Found', 'エラーメッセージのチェック');
    });
  });

  /**
   * 異常系テストケース
   *
   * バリデーションエラー
   */
  it('testFailValidation', () => {
    return (async () => {
      const todoUpdateRequest = {
        id: '1',
        title: '',
        isCompleted: true,
      };

      const response = await TodoTest.ApiClient.updateTodo(todoUpdateRequest);
      assert.fail(response.data);
    })().catch((error) => {
      assert.equal(error.response.status, 422, 'ステータスコードのチェック');
      assert.equal(error.response.data.code, 422, 'エラーコードのチェック');
      assert.equal(error.response.data.message, 'Unprocessable Entity', 'エラーメッセージのチェック');
      assert.ok(error.response.data.errors.id, 'idがerrorに含まれている事をチェック');
      assert.ok(error.response.data.errors.title, 'titleがerrorに含まれている事をチェック');
    });
  });
});
