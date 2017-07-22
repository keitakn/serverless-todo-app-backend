/**
 * TodoResponse
 *
 * @author keita-nishimoto
 * @since 2017-07-02
 */
export namespace TodoResponse {

  /**
   * TODO作成APIのリクエスト型
   */
  export interface CreateResponse {
    id: string;
    title: string;
    isCompleted: boolean;
    createdAt: number;
    updatedAt: number;
  }

  /**
   * TODO取得APIのレスポンス型
   */
  export interface FindResponse {
    id: string;
    title: string;
    isCompleted: boolean;
    createdAt: number;
    updatedAt: number;
  }

  /**
   * TODOリストAPIのレスポンス型
   */
  export interface FindListResponse {
    items: FindResponse[];
    count: number;
  }
}
