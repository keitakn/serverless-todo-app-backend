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

  /**
   * TODO変更APIのリクエスト型
   */
  export interface UpdateRequest {
    id: string;
    title: string;
    isCompleted: boolean;
  }

  /**
   * TODO変更APIのリクエスト型
   */
  export interface UpdateParams extends UpdateRequest {
    updatedAt: number;
  }
}
