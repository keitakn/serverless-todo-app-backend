/**
 * TodoRequest
 *
 * @author keita-nishimoto
 * @since 2017-07-02
 */
export namespace TodoRequest {

  /**
   * TODO作成APIのリクエスト型
   */
  export interface CreateRequest {
    title: string;
  }

  /**
   * TODO取得APIのリクエスト型
   */
  export interface FindRequest {
    id: string;
  }

  /**
   * TODOリスト取得APIのリクエスト型
   */
  export interface FindListRequest {
    limit?: number;
  }
}
