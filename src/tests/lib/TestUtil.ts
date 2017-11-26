/**
 * TestUtil
 * テストに利用する汎用ライブラリ
 *
 * @author keita-nishimoto
 * @since 2017-06-19
 */
export class TestUtil {

  /**
   * TodoAppBackendのURIを取得する
   * 自身のURIを知りたいという状況はテストでしか利用しない想定、よってこちらに定義する
   *
   * @returns {string}
   */
  public static getTodoAppBackendUri(): string {
    const uri = process.env.TODO_APP_BACKEND_BASE_URI;

    if (process.env.IS_LOCAL != null) {
      return 'http://localhost:3000';
    }

    return typeof uri === 'string' ? uri : '';
  }
}
