/**
 * TestUtil
 * テストに利用する汎用ライブラリ
 *
 * @author keita-nishimoto
 * @since 2017-06-19
 */
export class TestUtil {

  /**
   * APIGatewayのURIを作成する
   *
   * @returns {string}
   */
  public static createTodoApiUri(): string {
    const todoApiUri = process.env.TODO_API_BASE_URI;

    if (process.env.IS_LOCAL != null) {
      return 'http://localhost:3000';
    }

    return typeof todoApiUri === 'string' ? todoApiUri : '';
  }
}
