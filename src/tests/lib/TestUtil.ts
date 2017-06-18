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
    if (process.env.IS_LOCAL) {
      return "http://localhost:3000";
    }

    return process.env.TODO_API_BASE_URI;
  }
}
