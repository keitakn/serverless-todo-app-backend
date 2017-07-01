/**
 * TodoResponse
 *
 * @author keita-nishimoto
 * @since 2017-07-02
 */
namespace TodoResponse {

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
}
