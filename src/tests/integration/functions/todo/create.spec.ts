import * as assert from 'power-assert';
import { TodoTest } from '../../../lib/TodoTest';

/**
 * TODO作成のテスト
 */
describe('createTodoTest', () => {

  /**
   * 正常系テストケース
   */
  it('testSuccess', () => {
    return (async () => {
      const request = {
        title: '買い物に行く。',
      };
      const response = await TodoTest.ApiClient.createTodo(request);

      assert.equal(response.status, 201, 'ステータスコードのチェック');
      assert.equal(response.data.id.length, 36, 'IDの型チェック');
      assert.equal(response.data.title, request.title, 'タイトルのチェック');
      assert.equal(response.data.isCompleted, false, 'isCompletedがfalseである事をチェック');
      assert.ok(response.data.createdAt, 'createdAtの存在チェック');
      assert.ok(response.data.updatedAt, 'updatedAtの存在チェック');
    })();
  });

  /**
   * 異常系テストケース
   *
   * バリデーションエラー
   */
  it('testFailValidation', () => {
    return (async () => {
      const request = {
        title: 'a',
      };

      await TodoTest.ApiClient.createTodo(request);
    })().catch((error) => {
      assert.equal(error.response.status, 422, 'ステータスコードのチェック');
      assert.equal(error.response.data.code, 422, 'エラーコードのチェック');
      assert.equal(error.response.data.message, 'Unprocessable Entity', 'エラーメッセージのチェック');
      assert.ok(error.response.data.errors.title, 'titleがerrorに含まれている事をチェック');
    });
  });
});
