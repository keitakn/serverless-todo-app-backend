import * as assert from 'power-assert';
import { TodoTest } from '../../../lib/TodoTest';
import { TodoResponse } from '../../../../domain/TodoResponse';
import Environment from '../../../../infrastructures/Environment';

/**
 * TODO削除APIのテスト
 */
describe('deleteTodoTest', () => {

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
   * 削除が正常に完了する
   */
  it('testSuccessTodoExists', () => {
    return (async () => {
      // 事前作成データが存在する事を確認する
      const beforeFindResponse = await TodoTest.ApiClient.findTodo(todoCreateResponse.id);
      assert.equal(beforeFindResponse.status, 200, 'ステータスコードのチェック');
      assert.equal(beforeFindResponse.data.id, todoCreateResponse.id, 'IDの型チェック');
      assert.equal(beforeFindResponse.data.title, todoCreateResponse.title, 'タイトルのチェック');
      assert.equal(beforeFindResponse.data.isCompleted, todoCreateResponse.isCompleted, 'isCompletedがfalseである事をチェック');
      assert.equal(beforeFindResponse.data.createdAt, todoCreateResponse.createdAt, 'createdAtの存在チェック');
      assert.equal(beforeFindResponse.data.updatedAt, todoCreateResponse.updatedAt, 'updatedAtの存在チェック');

      const deleteResponse = await TodoTest.ApiClient.deleteTodo(todoCreateResponse.id);
      assert.equal(deleteResponse.status, 204, 'ステータスコードのチェック');

      // 削除が正常に行われた事を確かめる
      const findResponse = await TodoTest.ApiClient.findTodo(todoCreateResponse.id);
      assert.fail(findResponse);
    })().catch((error) => {
      // 該当データが削除されている事を確認する
      if (Environment.isLocal()) {
        assert.equal(error.response.request.path, `/todo/${todoCreateResponse.id}`);
      } else {
        assert.equal(error.response.request.path, `/dev/todo/${todoCreateResponse.id}`);
      }

      assert.equal(error.response.status, 404, 'ステータスコードのチェック');
      assert.equal(error.response.data.code, 404, 'エラーコードのチェック');
      assert.equal(error.response.data.message, 'Not Found', 'エラーメッセージのチェック');
    });
  });

  /**
   * 正常系テストケース
   *
   * 指定したTODOが存在しない
   * 削除対象が0件だったとしても正常終了する
   */
  it('testSuccessDoesNotExists', () => {
    return (async () => {
      const deleteResponse = await TodoTest.ApiClient.deleteTodo('999999999999999999aaaaaaaaaaaaaaaaaa');
      assert.equal(deleteResponse.status, 204, 'ステータスコードのチェック');
    })().catch((error) => {
      assert.fail(error.response.data);
    });
  });

  /**
   * 異常系テストケース
   *
   * バリデーションエラー
   */
  it('testFailValidation', () => {
    return (async () => {
      const response = await TodoTest.ApiClient.deleteTodo('abc');
      assert.fail(response.data);
    })().catch((error) => {
      assert.equal(error.response.status, 422, 'ステータスコードのチェック');
      assert.equal(error.response.data.code, 422, 'エラーコードのチェック');
      assert.equal(error.response.data.message, 'Unprocessable Entity', 'エラーメッセージのチェック');
      assert.ok(error.response.data.errors.id, 'idがerrorに含まれている事をチェック');
    });
  });
});
